import { useMemo, useCallback } from "react";
import * as Category from "./components/Category";
import { Select } from "./components";

export default function CategoryListSelector({
  categories = [],
  selected = [],
  onChange,
}) {
  const selectMap = useMemo(() => {
    let result = {};
    for (let id of selected) {
      result[id] = true;
    }
    for (let cat of categories) {
      result[cat.id] = result[cat.id] ?? false;
    }
    return result;
  }, [categories, selected]);

  const handleChange = useCallback(
    (selectMap) => {
      if (typeof onChange !== "function") return;
      let result = [];
      for (let cat of categories) {
        if (selectMap[cat.id]) result.push(cat.id);
      }
      onChange(result);
    },
    [onChange, categories]
  );

  return (
    <Category.List>
      {categories.map((cat) => (
        <Category.Item key={cat.id}>
          <Select
            checked={selectMap[cat.id]}
            onChange={(checked) => {
              const newMap = {
                ...selectMap,
                [cat.id]: checked,
              };
              handleChange(newMap);
              return newMap;
            }}
          >
            {cat.id} {cat.title}
          </Select>
        </Category.Item>
      ))}
    </Category.List>
  );
}
