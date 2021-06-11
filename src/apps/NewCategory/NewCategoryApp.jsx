import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Modal, Tab, Dropdown, TaggedSearch } from "../../components";
import { CategorySubModal } from "./CategorySubModal";
import * as SearchContent from "./SearchContent";
import { SearchCategoryResult } from "./SearchCategoryResult";
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

const tagToProduct = (tag) => ({
  name: tag,
  category: undefined,
});

const Container = styled(Modal)`
  position: relative;
`;

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [option, setOption] = useState("batch_input");
  const [tags, setTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();

  const updateProduct = useCallback(
    (product) => {
      let i = products.findIndex((p) => p.name === product.name);
      if (i === -1) i = products.length;
      setProducts([...products.slice(0, i), product, ...products.slice(i + 1)]);
    },
    [products]
  );

  useEffect(() => {
    setProducts(tags.map(tagToProduct));
  }, [tags]);

  useEffect(() => {
    API.categories().then(setCategories);
  }, []);

  return (
    <Container open clear title="新增類別">
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
          <StyledTaggedSearch onSubmit={setTags} />
          <SearchResult>
            <SearchContent.Header hint={<a href=".">商品及服務分類對照表</a>}>
              批次對應結果
            </SearchContent.Header>
            <SearchCategoryResult
              data={products}
              onCategorySelect={(product) => {
                setCurrentProduct(product);
                setModalOpen(true);
              }}
            />
          </SearchResult>
        </NewCategoryPage>
      </Tab.Container>
      <CategorySubModal
        open={isModalOpen}
        categories={categories}
        category={currentProduct && currentProduct.category}
        onCancel={() => {
          setCurrentProduct();
          setModalOpen(false);
        }}
        onSubmit={(category) => {
          updateProduct({ ...currentProduct, category });
          setCurrentProduct();
          setModalOpen(false);
        }}
      />
    </Container>
  );
};
