import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components";
import Select from "../../Select";
import * as List from "./List";

export const CustomCategory = ({
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
