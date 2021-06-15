import { SubModal, Button } from "../../components";
import { Category as C } from "../../utils";

export const CategorySubModal = ({
  id,
  className,
  open,
  category = C.empty,
  selected = [],
  onCancel,
  onSubmit,
}) => {
  return (
    <SubModal.Parent
      id={id}
      className={className}
      open={open}
      onClick={onCancel}
    >
      <SubModal.Wrapper onClick={(evt) => evt.stopPropagation()}>
        <SubModal.Header title="選擇商品/服務名稱">
          {category.id} {category.title}
        </SubModal.Header>
        <SubModal.Body></SubModal.Body>
        <SubModal.Footer>
          <Button type="record" onClick={onCancel}>
            取消
          </Button>
          <Button step type="primary" onClick={onSubmit}>
            確定
          </Button>
        </SubModal.Footer>
      </SubModal.Wrapper>
    </SubModal.Parent>
  );
};
