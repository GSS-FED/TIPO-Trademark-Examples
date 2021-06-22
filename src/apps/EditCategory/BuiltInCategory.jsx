import { useMemo, useCallback } from "react";
import styled from "styled-components";
import { useSelected } from "../../hooks";
import Collapsed from "../../Collapsed";
import { Select } from "../../components";
import * as List from "./List";

const Container = styled(Collapsed)`
  .form_collapsible_title {
    border: 1px solid #cce1ff;
    border-top-width: 0;
    padding: 7px 32px;
  }
  .form_collapsible_content {
    padding: 0;
    margin-left: 0;
    background: #eef5ff;
  }
`;

const Title = styled(List.Title)`
  padding: 0;
`;

const Id = styled.span`
  margin-right: 16px;
`;

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
  const { isSelected, toggleSelected } = useSelected(ids, selected);

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
      onChange(toggleSelected(id, value));
    },
    [onChange, toggleSelected]
  );

  const title = (
    <Title>
      <Select checked={isAllSelected} onChange={handleSelectAll}>
        <Id>{category.id}</Id>
        <span>{category.title}</span>
      </Select>
    </Title>
  );

  return (
    <Container id={id} className={className} title={title}>
      <List.List>
        {subcategories.map((cat) => (
          <List.Item key={cat.id}>
            <Select
              checked={isSelected(cat.id)}
              onChange={handleSelect(cat.id)}
            >
              <span>{cat.id}</span>
              <span>{cat.title}</span>
            </Select>
          </List.Item>
        ))}
      </List.List>
    </Container>
  );
};
