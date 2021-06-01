import cx from "classnames";

export const Button = ({
  className,
  step = false,
  little = false,
  type,
  ...props
}) => {
  const classes = cx(
    "button",
    {
      "button-step-primary": step && type === "primary",
      "button-step-secondary": step && type === "secondary",
      "button-primary": !step && type === "primary",
      "button-secondary": !step && type === "secondary",
      "button-record": !step && type === "record",
      "button-action": !step && type === "action",
      "button-text": !step && type === "text",
      "button-login": !step && type === "login",
      "button-little-primary": little && type === "primary",
      "button-little-secondary": little && type === "secondary",
    },
    className
  );
  return <button className={classes} {...props} />;
};
