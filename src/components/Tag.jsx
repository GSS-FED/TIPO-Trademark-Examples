import cx from "classnames";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  line-height: 1.5;
`;

export const Tag = ({
  id,
  className,
  children,
  onClose,
}) => {
  const classes = cx('form_tag', className);

  return (
    <Container id={id} className={classes}>
      <span className="form_tag_value">{children}</span>
      <FontAwesomeIcon
        className="form_tag_close"
        icon={faTimes}
        onClick={onClose}
      />
    </Container>
  );
};
