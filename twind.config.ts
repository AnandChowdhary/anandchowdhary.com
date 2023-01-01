import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
    colors: {
      white: colors.white,
      rose: colors.rose,
      gray: colors.gray,
    },
  },
} as Options;
