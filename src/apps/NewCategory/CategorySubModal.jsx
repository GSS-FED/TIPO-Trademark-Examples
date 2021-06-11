import { useState, useCallback, useEffect } from "react";
import { SubModal, Button, RadioList, Radio } from "../../components";

export const CategorySubModal = ({
  id,
  className,
  open,
  categories = [],
  category,
  onCancel,
  onSubmit,
}) => {
  const [current, setCurrent] = useState(category);

  const handleChange = useCallback(
    (id) => {
      const cat = categories.find((c) => c.id === id);
      setCurrent(cat);
    },
    [categories]
  );

  const handleSubmit = useCallback(() => {
    if (typeof onSubmit !== "function") return;
    onSubmit(current);
  }, [onSubmit, current]);

  useEffect(() => {
    if (!category) {
      setCurrent();
      return;
    }
    setCurrent(category);
  }, [categories, category]);

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
          <RadioList
            name="category"
            selected={current && current.id}
            onChange={handleChange}
          >
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
