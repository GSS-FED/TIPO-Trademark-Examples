import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../components";
import Select from "../../Select";
import * as List from "./List";

export const CategoryCreator = ({
  id,
  className,
  checked,
  onSubmit,
  onSelect,
}) => {
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
