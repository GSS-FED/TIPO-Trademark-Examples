import { useState, useCallback } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Button, Input } from "../../components";
import Select from "../../Select";
import * as List from "./List";

const Container = styled(List.Title)`
  display: flex;
  flex-direction: row;
  border: 1px solid #cce1ff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const TitleSelect = styled(Select)`
  margin-right: 12px;
  .form_selectInput_label {
    display: flex;
    flex-direction: row;
  }
`;

const TitleInput = styled(Input)`
  margin-right: 12px;
`;

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
    <Container id={id} className={className}>
      <TitleSelect checked={checked} onChange={onSelect}>
        自訂商品服務名稱
      </TitleSelect>
      <TitleInput
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
      />
      <Button type="record" disabled={!value} onClick={handleSubmit}>
        新增
      </Button>
    </Container>
  );
};
