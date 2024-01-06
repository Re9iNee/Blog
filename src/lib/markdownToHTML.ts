import { micromark } from "micromark";
import {
  Directive,
  directive,
  directiveHtml,
} from "micromark-extension-directive";
import { gfm, gfmHtml } from "micromark-extension-gfm";

export async function markdownToHTML(content: string): Promise<string> {
  const file = await micromark(content, {
    extensions: [gfm(), directive()],
    htmlExtensions: [gfmHtml(), directiveHtml({ mark })],
  });

  return file;
}

function mark(d: Directive) {
  if (d.type !== "textDirective") return false;

  this.tag("<mark");
  this.tag(">");
  this.raw(d.label || "");
  this.tag("</mark>");
}
