import type { CourseSchema } from "@/schemas/courses.schema";
import { useEffect, useState } from "react";
import type { Accept, DropzoneOptions } from "react-dropzone";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./file-upload";
import { CloudUpload, Paperclip } from "lucide-react";
import type { Asset } from "@/types";

interface FileUploadFieldProps {
  name: "video" | "thumbnail";
  label: string;
  description?: string;
  accept: Accept;
  maxSize: number;
  previewType: "video" | "image";
  form: UseFormReturn<CourseSchema>;
  existingFile?: Asset;
}

export function FileUploadField({
  name,
  label,
  description,
  accept,
  maxSize,
  previewType,
  form,
  existingFile,
}: FileUploadFieldProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>(
    existingFile?.url || "",
  );

  useEffect(() => {
    if (files?.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [files]);

  const handleFileChange = (newFiles: File[] | null) => {
    if (!newFiles) return;
    setFiles(newFiles);
    form.setValue(name, newFiles[0] || null);
    form.clearErrors(name);
  };

  const dropzoneOptions: DropzoneOptions = {
    maxFiles: 1,
    maxSize: maxSize,
    accept,
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUploader
              value={files}
              onValueChange={handleFileChange}
              dropzoneOptions={dropzoneOptions}
              className="bg-background relative rounded-lg p-2"
            >
              {files.length > 0 ? (
                <div className="flex items-center justify-between">
                  <div>
                    {previewUrl && previewType === "image" && (
                      <img
                        src={previewUrl}
                        className="max-h-64 w-auto rounded-md"
                        alt="Preview"
                      />
                    )}
                    {previewUrl && previewType === "video" && (
                      <video
                        src={previewUrl}
                        controls
                        className="max-h-64 w-full rounded-md"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <FileInput
                  id={`${name}Input`}
                  className="outline-1 outline-slate-500 outline-dashed"
                >
                  <div className="flex w-full flex-col items-center justify-center p-8">
                    <CloudUpload className="h-10 w-10 text-gray-500" />
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {JSON.stringify(accept, null, 2)} (Max:{" "}
                      {(maxSize / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  </div>
                </FileInput>
              )}
              <FileUploaderContent>
                {files &&
                  files.length > 0 &&
                  files.map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
