import combine_class from "@/_utils/combine_class";

import * as styles from "./index.css";

const Header = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={combine_class(className, styles.container)}
      {...props}
    ></header>
  );
};

export default Header;
