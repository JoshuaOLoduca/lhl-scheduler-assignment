import React from "react";
import DayListItem from "./DayListItem";
import PropTypes from "prop-types";

export default function DayList(props) {
  const { days, value, onChange } = props;

  // Creates array of days based on prop.day
  const constructedDays = days.map((curr) => (
    <DayListItem
      key={curr.id}
      name={curr.name}
      spots={curr.spots}
      selected={curr.name === value}
      setDay={onChange}
    ></DayListItem>
  ));

  return <ul>{constructedDays}</ul>;
}

DayList.propTypes = {
  days: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
