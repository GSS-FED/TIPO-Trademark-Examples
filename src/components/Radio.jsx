import { Children, cloneElement, useCallback } from "react";
import cx from "classnames";
import styled from "styled-components";

export const Radio = ({
  id,
  className,
  children,
  name,
  value,
  checked,
  onChange,
  ...props
}) => {
  const classes = cx("form_selectInputWrapper", className);

  return (
    <label id={id} className={classes}>
      <input
        {...props}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="form_radio" />
      <span className="form_selectInput_label">{children}</span>
    </label>
  );
};

const RadioListContainer = styled.div`
  flex-direction: column;
  margin: 0;
  > * + * {
    margin-top: 20px;
  }
`;

export const RadioList = ({
  id,
  className,
  name,
  selected,
  children,
  onChange,
}) => {
  const classes = cx("form_selectInputContainer", className);

  const isChecked = useCallback(
    (child) => {
      if (!selected || !child || !child.props) return false;
      return child.props.value === selected;
    },
    [selected]
  );

  const handleChange = useCallback(
    (evt) => {
      if (typeof onChange !== "function") return;
      onChange(evt.target.value);
    },
    [onChange]
  );

  return (
    <RadioListContainer id={id} className={classes}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          name,
          checked: isChecked(child),
          onChange: handleChange,
        })
      )}
    </RadioListContainer>
  );
};
