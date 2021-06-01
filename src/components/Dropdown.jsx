import styled from "styled-components";
import * as S from "semantic-ui-react";

export const Dropdown = styled(S.Dropdown)`
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  padding: 0 12px;
  border: 1px solid #d8e2f5;
  border-radius: 4px;

  .divider.text {
    width: 182px;
    padding-right: 12px;
    border-right: 1px solid #d8e2f5;
  }

  .menu {
    width: 100%;
  }
`;
