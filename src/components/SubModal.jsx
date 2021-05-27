import styled from "styled-components";

export const Wrapper = styled.div.attrs({
  className: "modal_subModal_wrapper"
})``;

export function Header({ title, children }) {
  return (
    <div className="modal_subModal_header">
      <div className="modal_subModal_header_title">{title}</div>
      <div className="modal_subModal_header_description">{children}</div>
    </div>
  );
}

export const Body = styled.div.attrs({
  className: "modal_subModal_body "
})``;

export const Footer = styled.div.attrs({
  className: "modal_subModal_footer"
})``;
