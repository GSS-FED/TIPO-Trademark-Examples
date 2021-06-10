import styled from "styled-components";
import cx from "classnames";

export const Parent = styled.div.attrs(({ open = false }) => ({
  className: cx("modal_subModal", { "modal_subModal-open": open }),
}))``;

export const Wrapper = styled.div.attrs({
  className: "modal_subModal_wrapper",
})`
  left: 50%;
`;

export function Header({ id, className, title, children }) {
  const classes = cx("modal_subModal_header", className);

  return (
    <div id={id} className={classes}>
      <div className="modal_subModal_header_title">{title}</div>
      <div className="modal_subModal_header_description">{children}</div>
    </div>
  );
}

export const Body = styled.div.attrs({
  className: "modal_subModal_body ",
})``;

export const Footer = styled.div.attrs({
  className: "modal_subModal_footer",
})``;
