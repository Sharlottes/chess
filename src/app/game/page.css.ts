import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  margin: "64px auto",
  gap: "64px",
  justifyContent: "center",
  alignItems: "center",
});

export const chessboard = style({
  minWidth: "700px",
  minHeight: "700px",
});

export const side = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  height: "700px",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});
