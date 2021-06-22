import cx from "classnames";

export function Select({ id, className, checked = false, onChange, children }) {
  const classes = cx("form_selectInputWrapper", className);

  return (
    <label id={id} className={classes}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(evt) => {
          if (typeof onChange !== "function") return;
          onChange(evt.target.checked);
        }}
      />
      <span className="form_checkbox"></span>
      <span className="form_selectInput_label">{children}</span>
    </label>
  );
}
