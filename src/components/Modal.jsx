import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const modalRoot = document.getElementById("modal");

const Background = styled.div.attrs({
  className: "modal_background",
})``;

const Wrapper = styled.div.attrs({
  className: "modal_wrapper",
})``;

const Header = styled.div.attrs({
  className: "modal_header",
})``;

const Title = styled.div.attrs({
  className: "modal_title",
})``;

const Close = styled.div.attrs({
  className: "modal_close",
})``;

const Content = styled.div.attrs({
  className: "modal_content",
})``;

class ModalParent extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { open, clear } = this.props;
    const classes = cx("modal", {
      "modal-open": open,
      "modal-clear": clear,
    });
    this.el.className = classes;

    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export const Modal = ({
  className,
  open = false,
  clear = false,
  title,
  children,
}) => {
  return (
    <ModalParent open={open} clear={clear}>
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
    </ModalParent>
  );
};
