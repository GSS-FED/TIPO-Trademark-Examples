import { useState, useMemo, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from "../../components";
import Select from "../../Select";
import * as List from "./List";
import * as API from "../../api";
import { Category as C, IdMap } from "../../utils";

const Container = styled(Modal)`
  position: relative;
`;

const CategoryCreator = ({ id, className, checked, onSubmit, onSelect }) => {
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
    <List.Title id={id} className={className}>
      <Select checked={checked} onChange={onSelect}>
        <span>自訂商品服務名稱</span>
        <input value={value} onChange={(evt) => setValue(evt.target.value)} />
        <Button type="record" disabled={!value} onClick={handleSubmit}>
          新增
        </Button>
      </Select>
    </List.Title>
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

  const handleChange = useCallback(
    (evt) => {
      evt.preventDefault();
      setEditing(false);
      if (typeof onChange !== "function") return;
      onChange({
        ...category,
        title: value,
        content: value,
      });
    },
    [onChange, category, value]
  );

  const handleCancel = useCallback((evt) => {
    evt.preventDefault();
    setEditing(false);
  }, []);

  const handleEdit = useCallback(
    (evt) => {
      evt.preventDefault();
      setValue(category.content);
      setEditing(true);
    },
    [category]
  );

  return (
    <List.Title id={id} className={className}>
      <Select checked={checked} onChange={onSelect}>
        <span>[自訂商品]</span>
        {isEditing ? (
          <>
            <input value={value} onChange={handleValueChange} />
            <Button type="primary" onClick={handleChange}>
              確定
            </Button>
            <Button type="text" onClick={handleCancel}>
              取消
            </Button>
          </>
        ) : (
          <>
            <span>{category.content}</span>
            <FontAwesomeIcon icon={faPen} onClick={handleEdit} />
          </>
        )}
      </Select>
    </List.Title>
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
      <List.Title>
        <Select checked={isAllSelected} onChange={handleSelectAll}>
          <span>{category.id}</span>
          <span>{category.title}</span>
        </Select>
      </List.Title>
      <List.List>
        {subcategories.map((cat) => (
          <List.Item key={cat.id}>
            <Select checked={selectMap[cat.id]} onChange={handleSelect(cat.id)}>
              <span>{cat.id}</span>
              <span>{cat.title}</span>
            </Select>
          </List.Item>
        ))}
      </List.List>
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
  const isAllSelected =
    customIds.length && customIds.length === customSelected.length;
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

  const handleSelectAll = useCallback(
    (value) => {
      if (!value) {
        setSelectMap({});
        return;
      }
      let newSelectMap = {};
      for (let id of customIds) {
        newSelectMap[id] = true;
      }
      setSelectMap(newSelectMap);
    },
    [customIds]
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
      <CategoryCreator
        checked={isAllSelected}
        onSelect={handleSelectAll}
        onSubmit={handleCreateCategory}
      />
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
