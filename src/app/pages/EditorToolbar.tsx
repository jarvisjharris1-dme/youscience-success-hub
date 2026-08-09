import type { Editor } from '@tiptap/react';
import { useRef } from 'react';
import { uploadData } from 'aws-amplify/storage';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
} from 'lucide-react';

export default function EditorToolbar({ editor }: { editor: Editor | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-2 rounded hover:bg-gray-100 ${active ? 'bg-gray-200 text-[#C15AB3]' : 'text-gray-600'}`;

  async function handleImageChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const key = `public/article-images/${Date.now()}-${file.name}`;
    try {
      const result = await uploadData({ path: key, data: file }).result;
      const { storagePublicUrl } = await import('../../lib/storagePublicUrl');
      const url = await storagePublicUrl(result.path);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error('Image upload failed', err);
      alert('Image upload failed. Check your connection and try again.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border border-gray-300 border-b-0 rounded-t-lg bg-gray-50 px-2 py-1.5">
      <button
        type="button"
        className={btn(editor.isActive('bold'))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('italic'))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </button>
      <span className="w-px h-5 bg-gray-300 mx-1" />
      <button
        type="button"
        className={btn(editor.isActive('heading', { level: 2 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('heading', { level: 3 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="w-4 h-4" />
      </button>
      <span className="w-px h-5 bg-gray-300 mx-1" />
      <button
        type="button"
        className={btn(editor.isActive('bulletList'))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        className={btn(editor.isActive('orderedList'))}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <span className="w-px h-5 bg-gray-300 mx-1" />
      <button
        type="button"
        className={btn(editor.isActive('link'))}
        onClick={() => {
          const url = window.prompt('Link URL');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      <button type="button" className={btn(false)} onClick={() => fileInputRef.current?.click()}>
        <ImageIcon className="w-4 h-4" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChosen}
      />
      <span className="w-px h-5 bg-gray-300 mx-1" />
      <button type="button" className={btn(false)} onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="w-4 h-4" />
      </button>
      <button type="button" className={btn(false)} onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
}
