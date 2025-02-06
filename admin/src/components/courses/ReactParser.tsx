import parser from "html-react-parser";

export function ReactParser({ html }: { html: string }) {
  const parsed = parser(html);

  return parsed;
}
