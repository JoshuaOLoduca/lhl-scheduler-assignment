import React from "react";
import DayListItem from "./DayListItem";

// import "components/DayList.scss";

export default function DayList(props) {
  const { days, value, onChange } = props;

  const constructedDays = days.map((curr) => (
    <DayListItem
      key={curr.id}
      name={curr.name}
      spots={curr.spots}
      selected={curr.name === value}
      setDay={onChange}
    ></DayListItem>
  ));

  console.log(constructedDays, days);

  // const classes = classNames();

  return <ul>{constructedDays}</ul>;
}
