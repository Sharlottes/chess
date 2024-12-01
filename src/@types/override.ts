declare module "react" {
  export type PropsWithElementProps<
    E extends
      | HTMLElement
      | keyof React.JSX.IntrinsicElements
      | React.JSXElementConstructor<any>,
    P = unknown,
  > = P &
    Omit<
      E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
        ? React.ComponentProps<E>
        : React.HTMLAttributes<E>,
      "children" | keyof P
    >;
}
export {};
