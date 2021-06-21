import { useState, useMemo, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../../components";
import Select from "../../Select";
import * as API from "../../api";
import { Category as C, IdMap } from "../../utils";

const Container = styled(Modal)`
  position: relative;
`;

const CatTitle = styled.div`
  padding: 7px 32px;
`;

const CatList = styled.div`
  padding: 0 32px;
`;

const CatItem = styled.div`
  padding: 12px 24px;
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
    <CatTitle id={id} className={className}>
      <span>自訂商品服務名稱</span>
      <input value={value} onChange={(evt) => setValue(evt.target.value)} />
      <button disabled={!value} onClick={handleSubmit}>
        新增
      </button>
    </CatTitle>
  );
};

const CustomCategory = ({
  id,
  className,
  checked,
  category,
  onChange,
  onSelect,
}) => {
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
    <CatTitle id={id} className={className}>
      <Select checked={checked} onChange={onSelect}>
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
      </Select>
    </CatTitle>
  );
};

const BuiltInCategory = ({
  id,
  className,
  category,
  selected = [],
  onChange,
}) => {
  const { subcategories = [] } = category;
  const ids = useMemo(
    () => subcategories.map((cat) => cat.id),
    [subcategories]
  );
  const isAllSelected = ids.length && ids.length === selected.length;
  const selectMap = useMemo(
    () => IdMap.fromIds(ids, selected),
    [ids, selected]
  );

  const handleSelectAll = useCallback(
    (value) => {
      if (typeof onChange !== "function") return;
      const newSelected = value ? ids : [];
      onChange(newSelected);
    },
    [onChange, ids]
  );

  const handleSelect = useCallback(
    (id) => (value) => {
      if (typeof onChange !== "function") return;
      const newMap = { ...selectMap, [id]: value };
      const newSelected = IdMap.toActivedIds(ids, newMap);
      onChange(newSelected);
    },
    [onChange, selectMap, ids]
  );

  return (
    <div id={id} className={className}>
      <CatTitle>
        <Select checked={isAllSelected} onChange={handleSelectAll}>
          <span>{category.id}</span>
          <span>{category.title}</span>
        </Select>
      </CatTitle>
      <CatList>
        {subcategories.map((cat) => (
          <CatItem key={cat.id}>
            <Select checked={selectMap[cat.id]} onChange={handleSelect(cat.id)}>
              <span>{cat.id}</span>
              <span>{cat.title}</span>
            </Select>
          </CatItem>
        ))}
      </CatList>
    </div>
  );
};

export const EditCategoryApp = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [categorySelectionTree, setCategorySelectionTree] = useState([]);
  const categorySelected = useMemo(
    () => C.flattenSelections(categorySelectionTree),
    [categorySelectionTree]
  );
  const [customCategories, setCustomCategories] = useState([]);
  const customIds = useMemo(
    () => customCategories.map((cat) => cat.id),
    [customCategories]
  );
  const [selectMap, setSelectMap] = useState({});
  const customSelected = useMemo(
    () => IdMap.toActivedIds(customIds, selectMap),
    [customIds, selectMap]
  );
  console.log(customSelected);

  const handleCreateCategory = useCallback((cat) => {
    setCustomCategories((cs) => [...cs, cat]);
  }, []);

  const handleEditCategory = useCallback(
    (i) => (cat) => {
      setCustomCategories((cs) => [...cs.slice(0, i), cat, ...cs.slice(i + 1)]);
    },
    []
  );

  const handleUpdateSelection = useCallback(
    (i) => (selected) => {
      setCategorySelectionTree((cst) => [
        ...cst.slice(0, i),
        selected,
        ...cst.slice(i + 1),
      ]);
    },
    []
  );

  const handleUpdateCustomSelection = useCallback(
    (id) => (value) => {
      const newSelectMap = { ...selectMap, [id]: value };
      setSelectMap(newSelectMap);
    },
    [selectMap]
  );

  useEffect(() => {
    API.categories().then(setCategories);
  }, []);

  useEffect(() => {
    const selectionTree = categories.map((cat) => []);
    setCategorySelectionTree(selectionTree);
  }, [categories]);

  useEffect(() => {
    const selectMap = IdMap.fromIds(customIds);
    setSelectMap(selectMap);
  }, [customIds]);

  return (
    <Container open clear title="編輯類別" onCancel={() => history.push("/")}>
      <CategoryCreator onSubmit={handleCreateCategory} />
      {customCategories.map((cat, i) => (
        <CustomCategory
          key={cat.id}
          category={cat}
          checked={selectMap[cat.id]}
          onChange={handleEditCategory(i)}
          onSelect={handleUpdateCustomSelection(cat.id)}
        />
      ))}
      {categories.map((cat, i) => (
        <BuiltInCategory
          key={cat.id}
          category={cat}
          selected={categorySelectionTree[i]}
          onChange={handleUpdateSelection(i)}
        />
      ))}
    </Container>
  );
};
