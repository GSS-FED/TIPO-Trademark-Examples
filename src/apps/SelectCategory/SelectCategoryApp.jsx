import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Modal, Tab, Dropdown } from "../../components";

const categoryOptions = [
  {
    key: "by_product_name",
    text: "商品名稱類別",
    value: "by_product_name",
  },
  {
    key: "by_industry",
    text: "產業別",
    value: "by_industry",
  },
  {
    key: "batch_input",
    text: "批次輸入",
    value: "batch_input",
  },
];

const Container = styled(Modal)`
  position: relative;
`;

const SelectCategoryPage = styled(Tab.Page).attrs({
  id: "newCategory_select",
})`
  ${Dropdown} {
    margin-top: 24px;
  }
`;

export const SelectCategoryApp = () => {
  const history = useHistory();
  const [option, setOption] = useState("by_product_name");

  return (
    <Container open clear title="新增類別" onCancel={() => history.push("/")}>
      <Tab.Container>
        <Tab.List>
          <Tab.Item actived>
            <Tab.Link href="#newCategory_new">自行挑選</Tab.Link>
          </Tab.Item>
          <Tab.Item>
            <Tab.Link herf="#newCategory_template">參考其他商標</Tab.Link>
          </Tab.Item>
        </Tab.List>
        <SelectCategoryPage>
          <Dropdown
            options={categoryOptions}
            value={option}
            onChange={(evt, data) => {
              setOption(data.value);
            }}
          />
        </SelectCategoryPage>
      </Tab.Container>
    </Container>
  );
};
