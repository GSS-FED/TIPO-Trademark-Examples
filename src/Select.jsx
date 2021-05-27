export default function Select({ checked = false, onChange, children }) {
  return (
    <label className="form_selectInputWrapper">
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
