import { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, Save, Settings2 } from 'lucide-react';
import { defaultCmsSettings, getCmsSettings, saveCmsSettings } from '../../lib/cmsSettings';
import type { CMSGlobalSettings } from '../../types/cmsSettings';

export function GlobalSettingsPanel({ onBack }: { onBack: () => void }) {
  const [settings, setSettings] = useState<CMSGlobalSettings>(defaultCmsSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => { getCmsSettings().then((value) => { setSettings(value); setLoading(false); }); }, []);
  const update = (key: keyof CMSGlobalSettings, value: string) => setSettings((current) => ({ ...current, [key]: value }));
  const updateUrl = (key: string, value: string) => setSettings((current) => ({ ...current, keyUrls: { ...current.keyUrls, [key]: value } }));
  const save = async () => {
    setSaving(true); setNotice('');
    const result = await saveCmsSettings(settings);
    setSaving(false);
    setNotice(result.error ? `Could not save: ${result.error}` : 'Global CMS settings saved. New article pages will use them.');
  };
  if (loading) return <div className="py-20 text-center text-sm text-slate-500"><Loader2 className="inline w-5 h-5 animate-spin mr-2" />Loading settings…</div>;
  const fields: Array<[keyof CMSGlobalSettings, string, string]> = [
    ['authorName', 'Author name', 'Ajith B R'], ['authorImage', 'Optional author image URL', 'https://…/ajith.webp'],
    ['authorClosingText', 'Optional author closing text', 'A short personal sign-off'], ['ctaHeading', 'CTA heading', 'Let’s build…'],
    ['primaryCtaText', 'Primary button text', 'Book a Growth Consultation'], ['primaryCtaUrl', 'Primary button URL', '/contact'],
    ['secondaryCtaText', 'Secondary CTA text (optional)', 'Explore All Services'], ['secondaryCtaUrl', 'Secondary CTA URL', '/services'],
    ['whatsappButtonText', 'WhatsApp button text (optional)', 'Chat on WhatsApp'], ['whatsappNumber', 'WhatsApp number (digits only)', '917892247558'],
    ['whatsappMessage', 'WhatsApp prefilled message (optional)', 'Hello Ajith…'],
  ];
  return <section className="max-w-4xl mx-auto space-y-6">
    <div className="flex items-center justify-between gap-4"><div><button type="button" onClick={onBack} className="text-xs font-semibold text-sky-800 inline-flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Back to articles</button><h1 className="mt-2 text-2xl font-bold text-[#0D1B2A] flex items-center gap-2"><Settings2 className="w-6 h-6" /> Global article settings</h1><p className="mt-1 text-sm text-slate-600">One place for author, article CTA and frequently used internal links.</p></div><button type="button" onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#0D1B2A] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Save className="w-4 h-4" />{saving ? 'Saving…' : 'Save settings'}</button></div>
    {notice && <p role="status" className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900">{notice}</p>}
    <div className="grid gap-5 rounded-2xl border border-[#DCE5EE] bg-white p-6">
      <div><h2 className="font-semibold">Author profile</h2><p className="text-xs text-slate-500 mt-1">Leave the image blank to show the standard initials card.</p></div>
      {fields.slice(0, 3).map(([key, label, placeholder]) => <label key={key} className="text-sm font-medium">{label}<input value={String(settings[key] || '')} onChange={(e) => update(key, e.target.value)} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-[#DCE5EE] p-2.5 text-sm" /></label>)}
      <label className="text-sm font-medium">Author bio<textarea value={settings.authorBio} onChange={(e) => update('authorBio', e.target.value)} rows={4} className="mt-1.5 w-full rounded-lg border border-[#DCE5EE] p-2.5 text-sm" /></label>
    </div>
    <div className="grid gap-5 rounded-2xl border border-[#DCE5EE] bg-white p-6"><div><h2 className="font-semibold">Consulting CTA</h2><p className="text-xs text-slate-500 mt-1">WhatsApp stays hidden on article pages if its number is blank.</p></div>{fields.slice(3).map(([key, label, placeholder]) => <label key={key} className="text-sm font-medium">{label}<input value={String(settings[key] || '')} onChange={(e) => update(key, e.target.value)} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-[#DCE5EE] p-2.5 text-sm" /></label>)}<label className="text-sm font-medium">CTA description<textarea value={settings.ctaDescription} onChange={(e) => update('ctaDescription', e.target.value)} rows={3} className="mt-1.5 w-full rounded-lg border border-[#DCE5EE] p-2.5 text-sm" /></label></div>
    <div className="rounded-2xl border border-[#DCE5EE] bg-white p-6"><h2 className="font-semibold">Important internal links</h2><p className="mt-1 text-xs text-slate-500">These appear in the editor’s Insert site link menu.</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{Object.entries(settings.keyUrls).map(([label, url]) => <label key={label} className="text-sm font-medium">{label}<input value={url} onChange={(e) => updateUrl(label, e.target.value)} className="mt-1.5 w-full rounded-lg border border-[#DCE5EE] p-2.5 text-sm" /></label>)}</div></div>
  </section>;
}
