import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorProvider,
  useCurrentEditor,
  type Extension,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-secondary/40 flex flex-wrap gap-1 rounded-t-md p-2 text-sm">
      <Button
        type="button"
        size="icon"
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={editor.isActive("code") ? "secondary" : "ghost"}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive("heading", { level: 1 })
            ? "secondary"
            : "ghost"
        }
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive("heading", { level: 2 })
            ? "secondary"
            : "ghost"
        }
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive("heading", { level: 3 })
            ? "secondary"
            : "ghost"
        }
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive("bulletList") ? "secondary" : "ghost"
        }
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive("orderedList") ? "secondary" : "ghost"
        }
        onClick={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive("blockquote") ? "secondary" : "ghost"
        }
        onClick={() =>
          editor.chain().focus().toggleBlockquote().run()
        }
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive({ textAlign: "left" })
            ? "secondary"
            : "ghost"
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive({ textAlign: "center" })
            ? "secondary"
            : "ghost"
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive({ textAlign: "right" })
            ? "secondary"
            : "ghost"
        }
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={
          editor.isActive({ textAlign: "justify" })
            ? "secondary"
            : "ghost"
        }
      >
        <AlignJustify className="h-4 w-4" />
      </Button>
    </div>
  );
}

const extensions: Extension[] = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },

    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export function TipTap() {
  const { setValue, getValues } = useFormContext();

  return (
    <div className="overflow-hidden rounded-md border">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={getValues("description")}
        onUpdate={({ editor }) => {
          setValue("description", editor.getHTML());
        }}
        editorProps={{
          attributes: {
            class: "min-h-[300px] p-4",
          },
        }}
      />
    </div>
  );
}
