import { useState } from "react";
import { Modal, Tab, Dropdown, TaggedSearch } from "../components";

const categoryOptions = [
  {
    key: 'by_product_name',
    text: '商品名稱類別',
    value: 'by_product_name',
  },
  {
    key: 'by_industry',
    text: '產業別',
    value: 'by_industry',
  },
  {
    key: 'batch_input',
    text: '批次輸入',
    value: 'batch_input',
  },
];

export const NewCategoryApp = () => {
  const [option, setOption] = useState('batch_input');

  return (
    <Modal open title="新增類別">
      <Tab.Container>
        <Tab.List>
          <Tab.Item actived>
            <Tab.Link href="#newCategory_new">自行挑選</Tab.Link>
          </Tab.Item>
          <Tab.Item>
            <Tab.Link herf="#newCategory_template">參考其他商標</Tab.Link>
          </Tab.Item>
        </Tab.List>
        <Tab.Page id="#newCategory_new">
          <Dropdown
            options={categoryOptions}
            value={option}
            onChange={(evt, data) => {
              setOption(data.value);
            }}
          />
          <TaggedSearch />
        </Tab.Page>
      </Tab.Container>
    </Modal>
  );
};
