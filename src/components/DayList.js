import React from "react";
import DayListItem from "./DayListItem";

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

  return <ul>{constructedDays}</ul>;
}
