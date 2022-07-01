import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
import * as colors from "twind/colors";
export * from "twind";

export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    colors: {
      slate: colors.red,
      orange: colors.orange,
      white: colors.white,
      gray: colors.trueGray,
      teal: colors.teal,
    },
  },
};
if (IS_BROWSER) setup(config);
