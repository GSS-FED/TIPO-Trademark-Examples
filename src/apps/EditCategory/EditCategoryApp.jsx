import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../../components";
import * as API from "../../api";

const Container = styled(Modal)`
  position: relative;
`;

const CategoryCreator = ({ id, className, onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    setValue("");
    if (typeof onSubmit !== "function") return;
    onSubmit({
      id: uuidv4(),
      title: value,
      content: value,
      comments: [],
    });
  }, [onSubmit, value]);

  return (
    <div id={id} className={className}>
      <span>自訂商品服務名稱</span>
      <input value={value} onChange={(evt) => setValue(evt.target.value)} />
      <button disabled={!value} onClick={handleSubmit}>
        新增
      </button>
    </div>
  );
};

const CustomCategory = ({ id, className, category }) => {
  return (
    <div id={id} className={className}>
      <span>[自訂商品]</span>
      <span>{category.content}</span>
    </div>
  );
};

const BuiltInCategory = ({ id, className, category }) => {
  return (
    <div id={id} className={className}>
      <span>{category.id}</span>
      <span>{category.title}</span>
    </div>
  );
};

export const EditCategoryApp = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);

  const handleCreateCategory = useCallback((cat) => {
    setCustomCategories((cs) => [...cs, cat]);
  }, []);

  useEffect(() => {
    API.categories().then(setCategories);
  }, []);

  return (
    <Container open clear title="編輯類別" onCancel={() => history.push("/")}>
      <CategoryCreator onSubmit={handleCreateCategory} />
      {customCategories.map((cat) => (
        <CustomCategory key={cat.id} category={cat} />
      ))}
      {categories.map((cat) => (
        <BuiltInCategory key={cat.id} category={cat} />
      ))}
    </Container>
  );
};
