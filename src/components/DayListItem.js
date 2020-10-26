import React from "react";

import 'components/DayListItem.scss';

const classNames = require('classnames');

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots === 0)
  });

  const formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return spots + " spots remaining"
    };
  }

  let remaining = formatSpots(props.spots);

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
      <h3>{remaining}</h3>
    </li>
  );
}