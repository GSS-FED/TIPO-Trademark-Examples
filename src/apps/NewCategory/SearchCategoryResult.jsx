import cx from "classnames";
import { Checkbox } from "../../components";

export const SearchCategoryResult = ({ id, className, data = [] }) => {
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
        <tbody>
          {data.map((product, i) => (
            <tr key={i}>
              <td>
                <Checkbox />
              </td>
              <td>{product.name}</td>
              <td>
                <a href=".">請選擇自訂類別</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
