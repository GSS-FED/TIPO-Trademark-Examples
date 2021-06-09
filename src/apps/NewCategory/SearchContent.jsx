import cx from "classnames";
import styled from "styled-components";

const Title = styled.div.attrs({
  className: "form_search_content_header_title",
})``;

const Hint = styled.div.attrs({
  className: "form_search_content_header_hint",
})``;

export const Header = ({ id, className, hint, children }) => {
  const classes = cx("form_search_content_header", className);
  return (
    <div id={id} className={classes}>
      <Title>{children}</Title>
      {hint && <Hint>{hint}</Hint>}
    </div>
  );
};
