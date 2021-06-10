import { useCallback } from "react";
import { SubModal, Button } from "../../components";

export const CategorySubModal = ({
  id,
  className,
  open,
  onCancel,
  onSubmit,
}) => {
  const handleSubmit = useCallback(() => {
    if (typeof onSubmit !== "function") return;
    onSubmit();
  }, [onSubmit]);

  return (
    <SubModal.Parent
      id={id}
      className={className}
      open={open}
      onClick={onCancel}
    >
      <SubModal.Wrapper onClick={(evt) => evt.stopPropagation()}>
        <SubModal.Header>選擇商品服務名稱類別</SubModal.Header>
        <SubModal.Body>此處應單選</SubModal.Body>
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
