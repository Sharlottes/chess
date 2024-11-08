import { style } from "@vanilla-extract/css";
import { themeVars } from "@/_styles/global.css";

export const container = style({
  borderTop: "1px solid",
  borderTopColor: themeVars.color.border,
});
