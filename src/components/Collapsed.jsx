import React, { useState } from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export function Collapsed({
  id,
  className = "",
  title = "",
  defaultOpen = false,
  children,
}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultOpen);
  const classes = cx(
    "form_collapsible",
    { "form_collapsible-open": !isCollapsed },
    className
  );

  const handleClick = (e) => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div id={id} className={classes}>
      <div className="form_collapsible_title">
        <span>{title}</span>
        <div className="form_collapsible_chevron" onClick={handleClick}>
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </div>
      <div className="form_collapsible_content">{children}</div>
    </div>
  );
}
