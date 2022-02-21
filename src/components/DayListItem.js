import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const classes = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  const formatSpots = (spotsLeft) => {
    switch (spotsLeft) {
      case 0:
        return `no spots remaining`;
      case 1:
        return `${spotsLeft} spot remaining`;
      default:
        return `${spotsLeft} spots remaining`;
    }
  };

  return (
    <li onClick={() => setDay(name)} className={classes}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
