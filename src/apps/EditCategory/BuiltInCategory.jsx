import { useMemo, useCallback } from "react";
import { IdMap } from "../../utils";
import Select from "../../Select";
import * as List from "./List";

export const BuiltInCategory = ({
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
