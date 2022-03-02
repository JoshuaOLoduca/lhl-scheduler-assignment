import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  // Sets css classes based on props
  const classes = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  // Formates spots available sub header
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
    <li onClick={() => setDay(name)} className={classes} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}

DayListItem.propTypes = {
  name: PropTypes.string,
  spots: PropTypes.number,
  selected: PropTypes.bool,
  setDay: PropTypes.func,
};
