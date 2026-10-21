import { supabase } from './supabase';

const BUCKET_NAME = 'blog-images';
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export interface UploadImageResult {
  url?: string;
  mediaId?: string;
  error?: string;
}

export interface BlogMediaItem {
  id: string;
  filename: string;
  public_url: string;
  mime_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
}

async function getImageDimensions(file: File): Promise<{ width?: number; height?: number }> {
  try {
    const image = await createImageBitmap(file);
    const dimensions = { width: image.width, height: image.height };
    image.close();
    return dimensions;
  } catch {
    return {};
  }
}

/**
 * Uploads a featured image to the Supabase 'blog-images' storage bucket.
 * Enforces JPEG, PNG, WebP format and 5MB size limit.
 * Returns public URL upon successful upload.
 */
export async function uploadBlogImage(file: File): Promise<UploadImageResult> {
  // 1. Validate file format
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      error: `Invalid file type (${file.type || 'unknown'}). Allowed formats: JPEG, PNG, WebP.`,
    };
  }

  // 2. Validate file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return {
      error: `File size (${sizeMb} MB) exceeds maximum allowed limit of 5 MB.`,
    };
  }

  try {
    // 3. Generate sanitized unique path: e.g. 2026/09/slug-timestamp.ext
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-');
    const timestamp = Date.now();
    const filePath = `articles/${timestamp}-${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return { error: error.message || 'Failed to upload image to Supabase Storage.' };
    }

    // 4. Retrieve public URL
    const { data: publicData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data?.path || filePath);

    if (!publicData?.publicUrl) {
      return { error: 'Failed to obtain public URL from Supabase Storage.' };
    }

    const dimensions = await getImageDimensions(file);
    const { data: mediaRecord } = await supabase
      .from('media_assets')
      .insert({
        filename: file.name,
        storage_path: data?.path || filePath,
        public_url: publicData.publicUrl,
        mime_type: file.type,
        file_size: file.size,
        width: dimensions.width || null,
        height: dimensions.height || null,
      })
      .select('id')
      .maybeSingle();

    return { url: publicData.publicUrl, mediaId: mediaRecord?.id };
  } catch (err: any) {
    return {
      error: err?.message || 'An unexpected error occurred during image upload.',
    };
  }
}

export async function listBlogImages(): Promise<BlogMediaItem[]> {
  const { data, error } = await supabase
    .from('media_assets')
    .select('id,filename,public_url,mime_type,file_size,width,height')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error || !data) return [];
  return data as BlogMediaItem[];
}
