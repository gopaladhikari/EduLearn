import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { env } from "@/config/env";
import { useFormContext } from "react-hook-form";
import { useTheme } from "@/hooks/use-theme";

export function TinyMCE() {
  const editorRef = useRef<TinyMCEEditor>(null);
  const { theme } = useTheme();

  const { getValues, setValue } = useFormContext();

  return (
    <Editor
      apiKey={env.tinyMceApiKey}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={getValues("description")}
      onChange={(_evt, editor) => {
        setValue("description", editor.getContent());
      }}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        skin: theme === "dark" ? "oxide-dark" : "snow",
        content_css: theme === "dark" ? "dark" : "default",
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px",
      }}
    />
  );
}
