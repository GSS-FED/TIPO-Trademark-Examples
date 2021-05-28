import cx from "classnames";
import styled from "styled-components";

export const Container = styled.div.attrs({
  className: 'tab ui-tabs ui-widget ui-widget-content',
})``;

export const List = styled.ul.attrs({
  className: 'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header',
})``;

export const Item = styled.li.attrs(({ actived = false }) => {
  const className = cx(
    'ui-tabs-tab',
    'ui-state-default',
    'ui-tab',
    {
      'ui-tabs-active': actived,
      'ui-state-active': actived,
    },
  );
  return { className };
})``;

export const Link = styled.a.attrs({
  className: 'ui-tabs-anchor',
})``;

export const Page = styled.div.attrs({
  className: 'ui-tabs-panel ui-widget-content',
})``;
