import { useState, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "../../components";
import Select from "../../Select";
import * as List from "./List";

const Container = styled(List.Title)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TitleSelect = styled(Select)`
  margin-right: 12px;
`;

const TitleInput = styled(Input)`
  margin-right: 12px;
`;

const Submit = styled(Button)`
  margin-right: 12px;
`;

const Content = styled.div`
  height: 40px;
  line-height: 40px;
  margin-right: 12px;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #66a5ff;
  cursor: pointer;
`;

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
    <Container id={id} className={className}>
      <TitleSelect checked={checked} onChange={onSelect}>
        [自訂商品]
      </TitleSelect>
      {isEditing ? (
        <>
          <TitleInput value={value} onChange={handleValueChange} />
          <Submit type="primary" onClick={handleChange}>
            確定
          </Submit>
          <Button type="text" onClick={handleCancel}>
            取消
          </Button>
        </>
      ) : (
        <>
          <Content>{category.content}</Content>
          <Icon icon={faPen} onClick={handleEdit} />
        </>
      )}
    </Container>
  );
};
