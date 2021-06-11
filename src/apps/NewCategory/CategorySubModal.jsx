import { useState, useMemo, useCallback } from "react";
import { SubModal, Button, RadioList, Radio } from "../../components";

export const CategorySubModal = ({
  id,
  className,
  open,
  categories = [],
  onCancel,
  onSubmit,
}) => {
  const [categoryId, setCategoryId] = useState();
  const category = useMemo(
    () => categories.find((cat) => cat.id === categoryId),
    [categories, categoryId]
  );

  const handleSubmit = useCallback(() => {
    if (typeof onSubmit !== "function") return;
    onSubmit(category);
  }, [onSubmit, category]);

  return (
    <SubModal.Parent
      id={id}
      className={className}
      open={open}
      onClick={onCancel}
    >
      <SubModal.Wrapper onClick={(evt) => evt.stopPropagation()}>
        <SubModal.Header>選擇商品服務名稱類別</SubModal.Header>
        <SubModal.Body>
          <RadioList name="category" onChange={setCategoryId}>
            {categories.map((cat) => (
              <Radio key={cat.id} value={cat.id}>
                {cat.id} {cat.title}
              </Radio>
            ))}
          </RadioList>
        </SubModal.Body>
        <SubModal.Footer>
          <Button type="record" onClick={onCancel}>
            取消
          </Button>
          <Button step type="primary" onClick={handleSubmit}>
            確定
          </Button>
        </SubModal.Footer>
      </SubModal.Wrapper>
    </SubModal.Parent>
  );
};
