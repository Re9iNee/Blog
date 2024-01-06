import { micromark } from "micromark";
import {
  Directive,
  Handle,
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

const mark: Handle = function (d: Directive) {
  if (d.type !== "textDirective") return false;

  this.tag("<mark");
  this.tag(">");
  this.raw(d.label || "");
  this.tag("</mark>");

  return undefined;
};
