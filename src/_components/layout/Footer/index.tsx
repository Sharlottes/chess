import combine_class from "@/_utils/combine_class";

import * as styles from "./index.css";

export default function Footer({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      className={combine_class(className, styles.container)}
      {...props}
    ></footer>
  );
}
