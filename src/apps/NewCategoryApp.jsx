import styled from "styled-components";
import { Modal } from "../components";

const Box = styled.div`
  padding: 80px 0px;
`;

export const NewCategoryApp = () => {
  return (
    <Modal open title="新增類別">
      <Box>This is a modal.</Box>
    </Modal>
  );
};
