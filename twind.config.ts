import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
    colors: {
      white: colors.white,
      orange: colors.orange,
      gray: colors.gray,
      yellow: colors.yellow,
    },
  },
} as Options;
