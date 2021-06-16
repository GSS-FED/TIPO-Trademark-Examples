import styled from "styled-components";

export const List = styled.ul`
  height: 360px;
  overflow-y: auto;
  margin: -8px -16px;
`;

const StyledItem = styled.li`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 auto;
  min-width: 0;
  width: calc(50% - 32px);
  padding: 12px;
  color: #333;
  border-radius: 4px;
  background-color: #f6faff;
  margin: 8px 16px;
`;

const StyledAnchor = styled.a`
  flex: 1 1 auto;
  display: block;
  width: 100%;
  height: 100%;
  padding: 4px;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Count = styled.span`
  padding: 4px 16px;
  background-color: #fff;
  border-radius: 18px;
  margin-left: 22px;
  color: #66a5ff;
`;

const formatCount = (count) => {
  const str = "" + count;
  if (str.length === 1) return "0" + str;
  return str;
};

export const Item = ({ id, className, count, href, onClick, children }) => {
  const showCount = count !== undefined && count !== 0;
  return (
    <StyledItem id={id} className={className}>
      <StyledAnchor href={href} onClick={onClick}>
        {children}
      </StyledAnchor>
      {showCount && <Count>{formatCount(count)}</Count>}
    </StyledItem>
  );
};
