import { useCallback } from "react";
import cx from "classnames";

export const Checkbox = ({
  id,
  className,
  checked = false,
  onChange,
  children,
  ...props
}) => {
  const classes = cx("form_selectInputWrapper", className);

  const handleChange = useCallback(() => {
    if (typeof onChange !== "function") return;
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <label id={id} className={classes} {...props}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span class="form_checkbox">{children}</span>
    </label>
  );
};
