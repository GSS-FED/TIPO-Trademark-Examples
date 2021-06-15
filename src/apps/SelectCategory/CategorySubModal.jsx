import { useState, useMemo, useCallback, useEffect } from "react";
import { SubModal, Button } from "../../components";
import Collapsed from "../../Collapsed";
import Select from "../../Select";
import { Category as C } from "../../utils";

const CategoryLeaf = ({ category, selected = [], onChange }) => {
  const products = useMemo(() => C.getProducts(category), [category]);
  const selectMap = useMemo(() => {
    let result = {};
    for (let product of products) {
      result[product] = false;
    }
    for (let s of selected) {
      result[s] = true;
    }
    return result;
  }, [products, selected]);

  const handleChange = useCallback(
    (product) => (checked) => {
      if (typeof onChange !== "function") return;
      if (selectMap[product] === undefined) return;
      const newMap = { ...selectMap, [product]: checked };
      let newSelected = [];
      for (let p of products) {
        if (newMap[p]) newSelected.push(p);
      }
      onChange(newSelected);
    },
    [onChange, selectMap, products]
  );

  return products.map((product) => (
    <Select
      key={product}
      checked={selectMap[product]}
      onChange={handleChange(product)}
    >
      {product}
    </Select>
  ));
};

const CategoryNode = ({ category, selected = [], onChange }) => {
  const { subcategories = [] } = category;

  const handleChange = useCallback(
    (i) => (ss) => {
      if (typeof onChange !== "function") return;
      onChange([...selected.slice(0, i), ss, ...selected.slice(i + 1)]);
    },
    [onChange, selected]
  );

  return subcategories.map((cat, i) => (
    <Collapsed key={cat.id} title={`${cat.id} ${cat.title}`}>
      <CollapsedCategory
        category={cat}
        selected={selected[i]}
        onChange={handleChange(i)}
      />
    </Collapsed>
  ));
};

const CollapsedCategory = ({ category, selected = [], onChange }) => {
  const Cat = C.isLeaf(category) ? CategoryLeaf : CategoryNode;
  return <Cat category={category} selected={selected} onChange={onChange} />;
};

export const CategorySubModal = ({
  id,
  className,
  open,
  category = C.empty,
  selected = [],
  onCancel,
  onSubmit,
}) => {
  const [currentSelected, setCurrentSelected] = useState(selected);

  const handleSubmit = useCallback(() => {
    if (typeof onSubmit !== "function") return;
    onSubmit(currentSelected);
  }, [onSubmit, currentSelected]);

  useEffect(() => {
    setCurrentSelected(selected);
  }, [selected]);

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
        <SubModal.Body>
          <CollapsedCategory
            category={category}
            selected={currentSelected}
            onChange={setCurrentSelected}
          />
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
