import cx from "classnames";
import styled from "styled-components";

const Container = styled.div.attrs(({ className }) => ({
  className: cx("form_input_wrapper", className),
}))``;

export const Input = ({ id, className, ...props }) => {
  return (
    <Container id={id} className={className}>
      <input {...props} />
    </Container>
  );
};
