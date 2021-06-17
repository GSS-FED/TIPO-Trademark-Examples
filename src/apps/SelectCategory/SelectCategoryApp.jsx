import { useState, useEffect, useCallback, useMemo } from "react";
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
import { CategorySubModal } from "./CategorySubModal";
import * as API from "../../api";
import { Category as C } from "../../utils";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoryIndex = useMemo(
    () => C.createSimpleIndex(categories),
    [categories]
  );
  const [categoryMap, setCategoryMap] = useState({});
  const [option, setOption] = useState("by_product_name");
  const [keyword, setKeyword] = useState("");
  const keywordRegex = useMemo(() => new RegExp(keyword.trim()), [keyword]);
  const filteredCategories = useMemo(() => {
    if (!keyword.trim()) return categories;
    return categories.filter((cat) => keywordRegex.test(categoryIndex[cat.id]));
  }, [keyword, keywordRegex, categories, categoryIndex]);
  const [currentCategory, setCurrentCategory] = useState(C.empty);

  const updateCategoryMap = useCallback(
    (cat, selected) => {
      const result = { ...categoryMap, [cat.id]: selected };
      setCategoryMap(result);
    },
    [categoryMap]
  );

  useEffect(() => {
    API.categories().then(setCategories);
  }, []);

  useEffect(() => {
    let result = {};
    for (let cat of categories) {
      result[cat.id] = [];
    }
    setCategoryMap(result);
  }, [categories]);

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
              {filteredCategories.map((cat) => {
                const flattened =
                  C.flattenSelections(categoryMap[cat.id]) ?? [];
                return (
                  <CategoryList.Item
                    key={cat.id}
                    href={`#${cat.id}`}
                    count={flattened.length}
                    onClick={(evt) => {
                      evt.preventDefault();
                      setCurrentCategory(cat);
                      setModalOpen(true);
                    }}
                  >
                    {cat.id} {cat.title}
                  </CategoryList.Item>
                );
              })}
            </CategoryList.List>
          </SearchResult>
        </SelectCategoryPage>
      </Tab.Container>
      <CategorySubModal
        open={isModalOpen}
        category={currentCategory}
        selected={categoryMap[currentCategory.id]}
        onCancel={() => {
          setModalOpen(false);
        }}
        onSubmit={(selected) => {
          updateCategoryMap(currentCategory, selected);
          setModalOpen(false);
        }}
      />
    </Container>
  );
};
