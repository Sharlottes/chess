import { style } from "@vanilla-extract/css";
export const container = style({
  maxWidth: "460px",
  margin: "0 auto",
  marginTop: "256px",
  display: "flex",
  gap: "8px",
  flexDirection: "column",
});

export const button = style({
  fontWeight: "bold",
  marginTop: "8px",
  width: "100%",
});
