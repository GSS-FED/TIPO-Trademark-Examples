import styled from "styled-components";
import { Modal, Tab } from "../components";

const Box = styled.div`
  padding: 80px 0px;
`;

export const NewCategoryApp = () => {
  return (
    <Modal open title="新增類別">
      <Tab.Container>
        <Tab.List>
          <Tab.Item actived>
            <Tab.Link href="#newCategory_new">自行挑選</Tab.Link>
          </Tab.Item>
          <Tab.Item>
            <Tab.Link herf="#newCategory_template">參考其他商標</Tab.Link>
          </Tab.Item>
        </Tab.List>
        <Tab.Page id="#newCategory_new">
          <Box>This is a modal.</Box>
        </Tab.Page>
      </Tab.Container>
    </Modal>
  );
};
