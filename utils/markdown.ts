import { micromark } from "https://esm.sh/micromark@3";
import { gfm, gfmHtml } from "https://esm.sh/micromark-extension-gfm@2";

export const render = (markdown: string) => {
  return micromark(markdown, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
};
