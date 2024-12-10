import { style } from "@vanilla-extract/css";

export const container = style({
  margin: "64px auto",
  maxWidth: "620px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const button = style({
  width: "100%",
  fontWeight: "bold",
  cursor: "pointer",
});

export const dialog = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "center",
  gap: "12px",
});

export const actionBar = style({
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

export const title = style({
  color: "white",
  textAlign: "center",
});

export const divider = style({
  height: "1px",
  width: "100%",
  backgroundColor: "white",
  margin: "8px 0",
});
