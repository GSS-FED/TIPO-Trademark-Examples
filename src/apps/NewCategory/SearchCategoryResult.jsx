import cx from "classnames";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "../../components";

const EmptyTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 180px;
  border-left: 1px solid #cce1ff;
  border-bottom: 1px solid #cce1ff;
  border-right: 1px solid #cce1ff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Edit = styled.span`
  display: inline-block;
  margin-left: 1rem;
  color: #66a5ff;
  cursor: pointer;
`;

export const SearchCategoryResult = ({
  id,
  className,
  data = [],
  onCategorySelect,
}) => {
  const classes = cx("form_searchCategoryResult", className);

  return (
    <div id={id} className={classes}>
      <table>
        <colgroup>
          <col width={64} />
          <col />
          <col width={140} />
        </colgroup>
        <thead>
          <tr>
            <th>選擇</th>
            <th>商品服務名稱</th>
            <th>商品類別</th>
          </tr>
        </thead>
        {data.length !== 0 && (
          <tbody>
            {data.map((product, i) => (
              <tr key={i}>
                <td>
                  <Checkbox />
                </td>
                <td>{product.name}</td>
                <td>
                  {product.category !== undefined ? (
                    <>
                      <span>{product.category.title}</span>
                      <Edit>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() => {
                            if (typeof onCategorySelect !== "function") return;
                            onCategorySelect(product);
                          }}
                        />
                      </Edit>
                    </>
                  ) : (
                    <a
                      href="."
                      onClick={(evt) => {
                        evt.preventDefault();
                        if (typeof onCategorySelect !== "function") return;
                        onCategorySelect(product);
                      }}
                    >
                      新增商品類別
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {data.length === 0 && (
        <EmptyTable>
          <p>
            請先在上方輸入框輸入
            <br />
            商品服務名稱唷！
          </p>
        </EmptyTable>
      )}
    </div>
  );
};
