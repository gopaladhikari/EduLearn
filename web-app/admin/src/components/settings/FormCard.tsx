import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z, type ZodSchema } from "zod";
import type { User } from "@/types";
import { Separator } from "../ui/separator";
import { useMutation } from "@tanstack/react-query";
import { updateUserMutation } from "@/lib/mutations/user.mutation";
import { toast } from "@/hooks/use-toast";
import { queryClient } from "@/main";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PhoneInput } from "../ui/phone-input";
import { FileInput, FileUploader } from "@/components/ui/file-upload";
import { useEffect, useState } from "react";
import type { DropzoneOptions } from "react-dropzone";

type Props = {
  label: string;
  description: string;
  placeholder?: string;
  defaultValues?: Partial<User>;
  schema: ZodSchema;
  fieldName: keyof User;
  type?: "text" | "textarea" | "number" | "file";
};

type CachedUser = {
  data: User;
};

export function FormCard({
  label,
  description,
  placeholder,
  schema,
  fieldName,
  defaultValues,
  type = "text",
}: Props) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const dropZoneConfig: DropzoneOptions = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserMutation,
    mutationKey: ["update-user"],
    onSuccess: (data) => {
      toast({
        title: data.message,
      });
    },

    onMutate: async (fieldName: Partial<User>) => {
      await queryClient.cancelQueries({
        queryKey: ["me"],
      });

      const oldUser = queryClient.getQueriesData({
        queryKey: ["me"],
      });

      const { data } = oldUser[0][1] as CachedUser;

      const newUser = {
        ...data,
        ...fieldName,
      };

      queryClient.setQueryData(["me"], {
        data: newUser,
      });
      return newUser;
    },

    onError: (_error, _fieldName, user) => {
      queryClient.setQueryData(["me"], {
        data: user,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });

  function onSubmit(data: Partial<User>) {
    mutate(data);
  }

  useEffect(() => {
    if (files && files.length > 0) {
      setFileUrl(URL.createObjectURL(files[0]));
    }
  }, [files]);

  return (
    <>
      <Separator />
      <Card className="bg-background/50 p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">{label}</FormLabel>
                  <FormDescription>{description}</FormDescription>
                  <FormControl>
                    <>
                      {type === "textarea" && (
                        <Textarea
                          rows={5}
                          placeholder={placeholder}
                          {...field}
                        />
                      )}
                      {type === "text" && (
                        <Input placeholder={placeholder} {...field} />
                      )}

                      {type === "number" && (
                        <PhoneInput
                          placeholder={placeholder}
                          defaultCountry="NP"
                          {...field}
                        />
                      )}
                      {type === "file" && (
                        <FileUploader
                          value={files}
                          onValueChange={setFiles}
                          dropzoneOptions={dropZoneConfig}
                        >
                          <FileInput id="fileInput">
                            <Avatar className="h-20 w-20 object-cover">
                              <AvatarImage
                                className="w-full object-contain"
                                src={
                                  fileUrl || defaultValues?.avatarUrl
                                }
                              />
                              <AvatarFallback>
                                {defaultValues?.fullName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </FileInput>
                        </FileUploader>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}
