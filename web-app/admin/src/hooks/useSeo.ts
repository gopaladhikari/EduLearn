import { site } from "@/config/site";
import { useEffect } from "react";

type SeoProps = {
  title: string;
  description?: string;
};

export function useSeo({ title, description }: SeoProps) {
  useEffect(() => {
    if (title) document.title = `${title} | ${site.title}`;
    if (description)
      document
        .querySelector("meta[name=description]")
        ?.setAttribute("content", description);

    return () => {
      document.title = "E-learning";
      document
        .querySelector("meta[name=description]")
        ?.setAttribute("content", site.description);
    };
  }, [title, description]);
}
