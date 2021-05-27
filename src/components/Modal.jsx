import cx from "classnames";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Background = styled.div.attrs({
  className: 'modal_background',
})``;

const Wrapper = styled.div.attrs({
  className: 'modal_wrapper',
})``;

const Header = styled.div.attrs({
  className: 'modal_header',
})``;

const Title = styled.div.attrs({
  className: 'modal_title',
})``;

const Close = styled.div.attrs({
  className: 'modal_close',
})``;

const Content = styled.div.attrs({
  className: 'modal_content',
})``;

export const Modal = ({
  className,
  open = false,
  title,
  children,
  ...props
}) => {
  const classes = cx(
    'modal',
    { 'modal-open': open },
  );

  return (
    <div className={classes} {...props}>
      <Background />
      <Wrapper>
        <Header>
          <Title>{title}</Title>
          <Close>
            <FontAwesomeIcon icon={faTimes} />
          </Close>
        </Header>
        <Content>{children}</Content>
      </Wrapper>
    </div>
  );
};
