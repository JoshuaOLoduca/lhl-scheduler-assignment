import React from "react";
import DayListItem from "./DayListItem";

// import "components/DayList.scss";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const constructedDays = days.map((curr) => (
    <DayListItem
      key={curr.id}
      name={curr.name}
      spots={curr.spots}
      selected={curr.name === day}
      setDay={setDay}
    ></DayListItem>
  ));

  console.log(constructedDays, days);

  // const classes = classNames();

  return <ul>{constructedDays}</ul>;
}
