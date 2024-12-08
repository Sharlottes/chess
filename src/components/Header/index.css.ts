import { style } from "@vanilla-extract/css";

export const header = style({
  height: "64px",
  backgroundColor: "#2c2b29",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "8px",
  padding: "8px 36px",
});

export const title = style({
  fontWeight: "bold",
  fontSize: "32px",
  color: "white",
  marginRight: "auto",
});

export const button = style({
  fontWeight: "bold",
  cursor: "pointer",
});
