import { themeVars } from "@/_styles/global.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  height: "90px",
  width: "100vw",
  borderBottom: `1px solid ${themeVars.color.border}`,
});
