import { useState, useMemo, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "../../components";
import { CategoryCreator } from "./CategoryCreator";
import { CustomCategory } from "./CustomCategory";
import { BuiltInCategory } from "./BuiltInCategory";
import * as API from "../../api";
import { Category as C, IdMap } from "../../utils";

const Container = styled(Modal)`
  position: relative;
`;

const CustomContent = styled.div`
  border: 1px solid #cce1ff;
  border-top-width: 0;
  padding-top: 8px;
  padding-bottom: 8px;
`;

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
      {customCategories.length !== 0 && (
        <CustomContent>
          {customCategories.map((cat, i) => (
            <CustomCategory
              key={cat.id}
              category={cat}
              checked={selectMap[cat.id]}
              onChange={handleEditCategory(i)}
              onSelect={handleUpdateCustomSelection(cat.id)}
            />
          ))}
        </CustomContent>
      )}
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
