import { style } from "@vanilla-extract/css";

export const container = style({
  position: "absolute",
  display: "block",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  selectors: {
    ['&[aria-disabled="true"]']: {
      display: "none",
    },
  },
});

export const backdrop = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
  backgroundColor: "rgba(0,0,0,0.5)",
});

export const body = style({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 10,
  width: "fit-content",
});

export const content = style({
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "16px",
  width: "360px",
  minHeight: "120px",
});
