import React, { useRef } from 'react';
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo2,
  HelpCircle,
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  /**
   * Helper to wrap or insert markdown syntax around selected text or cursor
   */
  const insertFormatting = (prefix: string, suffix: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;

    const selectedText = currentText.substring(start, end) || placeholder;
    const newText =
      currentText.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      currentText.substring(end);

    onChange(newText);

    // Reposition cursor nicely after update
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length + suffix.length;
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  /**
   * Insert line-based markdown prefixes (headings, lists, blockquotes)
   */
  const insertLinePrefix = (prefix: string, defaultText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;

    const selectedText = currentText.substring(start, end);
    const textToInsert = selectedText ? selectedText : defaultText;

    // Ensure it starts on a new line if not already
    const isAtStartOfLine = start === 0 || currentText[start - 1] === '\n';
    const preNewline = isAtStartOfLine ? '' : '\n\n';

    const newText =
      currentText.substring(0, start) +
      preNewline +
      prefix +
      textToInsert +
      '\n\n' +
      currentText.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + preNewline.length + prefix.length,
        start + preNewline.length + prefix.length + textToInsert.length
      );
    }, 0);
  };

  const handleLinkInsert = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || 'link text';

    const url = window.prompt('Enter link destination URL:', 'https://');
    if (url) {
      insertFormatting('[', `](${url})`, selectedText);
    }
  };

  return (
    <div className="border border-[#DCE5EE] rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-sky-800/20 focus-within:border-sky-800 transition-all">
      {/* Editor Toolbar */}
      <div className="bg-[#F8FAFC] border-b border-[#DCE5EE] px-3 py-2 flex flex-wrap items-center gap-1">
        <button
          type="button"
          disabled={disabled}
          title="Heading 2 (##)"
          onClick={() => insertLinePrefix('## ', 'Section Heading')}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50 text-xs font-semibold flex items-center gap-1"
        >
          <Heading2 className="w-4 h-4" />
          <span className="hidden sm:inline">H2</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          title="Heading 3 (###)"
          onClick={() => insertLinePrefix('### ', 'Subheading')}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50 text-xs font-semibold flex items-center gap-1"
        >
          <Heading3 className="w-4 h-4" />
          <span className="hidden sm:inline">H3</span>
        </button>

        <div className="h-4 w-[1px] bg-slate-300 mx-1" />

        <button
          type="button"
          disabled={disabled}
          title="Bold (**text**)"
          onClick={() => insertFormatting('**', '**', 'bold text')}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={disabled}
          title="Italic (*text*)"
          onClick={() => insertFormatting('*', '*', 'italic text')}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-300 mx-1" />

        <button
          type="button"
          disabled={disabled}
          title="Bullet List (- item)"
          onClick={() => insertLinePrefix('- ', 'List item')}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={disabled}
          title="Numbered List (1. item)"
          onClick={() => insertLinePrefix('1. ', 'Numbered item')}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-300 mx-1" />

        <button
          type="button"
          disabled={disabled}
          title="Insert Link [text](url)"
          onClick={handleLinkInsert}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50"
        >
          <Link className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={disabled}
          title="Blockquote (> quote)"
          onClick={() => insertLinePrefix('> ', 'Important consultative takeaway or quote')}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={disabled}
          title="Code Block"
          onClick={() => insertFormatting('`', '`', 'code')}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-200 hover:text-[#0D1B2A] transition-colors disabled:opacity-50"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="ml-auto flex items-center text-[11px] text-slate-500 font-mono">
          Markdown / HTML Ready
        </div>
      </div>

      {/* Main Textarea */}
      <textarea
        ref={textareaRef}
        rows={16}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your article content here in Markdown format...
## Section Title
Write thorough, authoritative insights for residential construction executives.

- Key point one
- Key point two

Use the toolbar buttons above for quick formatting."
        className="w-full p-4 font-mono text-xs sm:text-sm text-[#0D1B2A] placeholder:text-slate-400 bg-white focus:outline-none resize-y min-h-[360px] leading-relaxed"
      />
    </div>
  );
};
