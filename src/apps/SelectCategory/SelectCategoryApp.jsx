import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Modal,
  Tab,
  Dropdown,
  Input,
  SearchContent,
  CategoryList,
} from "../../components";
import * as API from "../../api";

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

const CategorySearch = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
`;

const SearchInput = styled(Input)`
  flex: 1 1 auto;
  max-width: none;
  margin-left: 16px;
`;

const SelectCategoryPage = styled(Tab.Page).attrs({
  id: "newCategory_select",
})``;

const SearchResult = styled.div`
  margin-top: 24px;
`;

export const SelectCategoryApp = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [option, setOption] = useState("by_product_name");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    API.categories().then(setCategories);
  }, []);

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
          <CategorySearch>
            <Dropdown
              options={categoryOptions}
              value={option}
              onChange={(evt, data) => {
                setOption(data.value);
              }}
            />
            <SearchInput
              placeholder="請輸入關鍵字(ex.咖啡、飲料)或群組代碼(ex.3002)"
              value={keyword}
              onChange={(evt) => {
                setKeyword(evt.target.value);
              }}
            />
          </CategorySearch>
          <SearchResult>
            <SearchContent.Header hint={<a href=".">商品及服務分類對照表</a>}>
              商品
            </SearchContent.Header>
            <CategoryList.List>
              {categories.map((cat) => (
                <CategoryList.Item
                  href={`#${cat.id}`}
                  onClick={(evt) => {
                    evt.preventDefault();
                  }}
                >
                  {cat.id} {cat.title}
                </CategoryList.Item>
              ))}
            </CategoryList.List>
          </SearchResult>
        </SelectCategoryPage>
      </Tab.Container>
    </Container>
  );
};
