import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
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

const CustomCategory = ({ id, className, category, onChange }) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(category.content);

  const handleValueChange = useCallback((evt) => {
    setValue(evt.target.value);
  }, []);

  const handleChange = useCallback(() => {
    setEditing(false);
    if (typeof onChange !== "function") return;
    onChange({
      ...category,
      title: value,
      content: value,
    });
  }, [onChange, category, value]);

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, []);

  const handleEdit = useCallback(() => {
    setValue(category.content);
    setEditing(true);
  }, [category]);

  return (
    <div id={id} className={className}>
      <span>[自訂商品]</span>
      {isEditing ? (
        <>
          <input value={value} onChange={handleValueChange} />
          <button onClick={handleChange}>確定</button>
          <button onClick={handleCancel}>取消</button>
        </>
      ) : (
        <>
          <span>{category.content}</span>
          <FontAwesomeIcon icon={faPen} onClick={handleEdit} />
        </>
      )}
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

  const handleEditCategory = useCallback(
    (i) => (cat) => {
      setCustomCategories((cs) => [...cs.slice(0, i), cat, ...cs.slice(i + 1)]);
    },
    []
  );

  useEffect(() => {
    API.categories().then(setCategories);
  }, []);

  return (
    <Container open clear title="編輯類別" onCancel={() => history.push("/")}>
      <CategoryCreator onSubmit={handleCreateCategory} />
      {customCategories.map((cat, i) => (
        <CustomCategory
          key={cat.id}
          category={cat}
          onChange={handleEditCategory(i)}
        />
      ))}
      {categories.map((cat) => (
        <BuiltInCategory key={cat.id} category={cat} />
      ))}
    </Container>
  );
};
