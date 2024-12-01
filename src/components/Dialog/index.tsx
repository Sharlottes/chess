import * as styles from "./index.css";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export default function Dialog({
  open,
  onClose,
  children,
}: React.PropsWithChildren<DialogProps>) {
  return (
    <div className={styles.container} aria-disabled={!open}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.body}>{children}</div>
    </div>
  );
}
