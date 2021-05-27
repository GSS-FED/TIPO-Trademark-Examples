import { useState, useEffect } from "react";
import CategorySelector from "./CategorySelector";
import * as Category from "./components/Category";
import * as SubModal from "./components/SubModal";
import { Button } from "./components/Button";
import * as API from "./api";
import * as C from "./category";
import "./scss/index.scss";

export default function App() {
  const [categories, setCategories] = useState([]);
  const index = 0;
  const current = categories[index] ?? C.empty;

  useEffect(() => {
    API.categories().then(setCategories);
  }, []);

  return (
    <SubModal.Wrapper>
      <SubModal.Header title="選擇商品/服務名稱">
        {current.id} {current.title}
      </SubModal.Header>
      <SubModal.Body>
        <Category.List>
          {current.subcategories.map((cat) => (
            <CategorySelector
              key={cat.id}
              data={cat}
              onChange={(selected) => {
                console.log(selected);
              }}
            />
          ))}
        </Category.List>
      </SubModal.Body>
      <SubModal.Footer>
        <Button type="record">取消</Button>
        <Button step type="primary">確定</Button>
      </SubModal.Footer>
    </SubModal.Wrapper>
  );
}
