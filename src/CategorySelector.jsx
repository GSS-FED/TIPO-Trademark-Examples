import { useState } from "react";
import * as C from "./utils/category";
import * as Category from "./components/Category";
import Select from "./Select";
import Collapsed from "./Collapsed";
import CategoryListSelector from "./CategoryListSelector";

export default function CategorySelector({ data = C.empty, onChange }) {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState([]);

  return C.isLeaf(data) ? (
    <Category.Item>
      <Select
        checked={checked}
        onChange={(checked) => {
          setChecked(checked);
          if (typeof onChange !== "function") return;
          onChange(checked ? [data.id] : []);
        }}
      >
        {data.id} {data.title}
      </Select>
    </Category.Item>
  ) : (
    <Collapsed
      title={
        <Select
          checked={data.subcategories.length === selected.length}
          onChange={(checked) => {
            if (checked) {
              setSelected(data.subcategories.map((cat) => cat.id));
            } else {
              setSelected([]);
            }
          }}
        >
          {data.id} {data.title}
        </Select>
      }
    >
      <CategoryListSelector
        categories={data.subcategories}
        selected={selected}
        onChange={(selected) => {
          setSelected(selected);
          if (typeof onChange !== "function") return;
          if (data.subcategories.length === selected.length) {
            onChange([data.id, ...selected]);
          } else {
            onChange(selected);
          }
        }}
      />
    </Collapsed>
  );
}
