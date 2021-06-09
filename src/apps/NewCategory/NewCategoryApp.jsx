import { useState } from "react";
import styled from "styled-components";
import { Modal, Tab, Dropdown, TaggedSearch } from "../../components";
import * as SearchContent from "./SearchContent";
import { SearchCategoryResult } from "./SearchCategoryResult";

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

const products = [
  {
    name: "咖啡素",
    category: undefined,
  },
  {
    name: "咖啡",
    category: undefined,
  },
  {
    name: "茶",
    category: undefined,
  },
];

const StyledTaggedSearch = styled(TaggedSearch)``;

const NewCategoryPage = styled(Tab.Page).attrs({
  id: "newCategory_new",
})`
  ${Dropdown} {
    margin-top: 24px;
  }

  ${StyledTaggedSearch} {
    margin-top: 8px;
  }
`;

const SearchResult = styled.div`
  margin-top: 24px;
`;

export const NewCategoryApp = () => {
  const [option, setOption] = useState("batch_input");

  return (
    <Modal open clear title="新增類別">
      <Tab.Container>
        <Tab.List>
          <Tab.Item actived>
            <Tab.Link href="#newCategory_new">自行挑選</Tab.Link>
          </Tab.Item>
          <Tab.Item>
            <Tab.Link herf="#newCategory_template">參考其他商標</Tab.Link>
          </Tab.Item>
        </Tab.List>
        <NewCategoryPage>
          <Dropdown
            options={categoryOptions}
            value={option}
            onChange={(evt, data) => {
              setOption(data.value);
            }}
          />
          <StyledTaggedSearch />
          <SearchResult>
            <SearchContent.Header hint={<a href=".">商品及服務分類對照表</a>}>
              批次對應結果
            </SearchContent.Header>
            <SearchCategoryResult data={products} />
          </SearchResult>
        </NewCategoryPage>
      </Tab.Container>
    </Modal>
  );
};
