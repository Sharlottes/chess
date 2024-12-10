import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  gap: "16px",
  margin: "0 auto",
  marginTop: "64px",
  maxWidth: "1280px",
  justifyContent: "center",
});

export const title = style({ color: "white", textAlign: "center" });

export const button = style({
  display: "flex",
  gap: "8px",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  marginTop: "8px",
  width: "240px",
});
