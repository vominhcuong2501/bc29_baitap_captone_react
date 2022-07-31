import React, { useState } from "react";
import "./chair.scss";

export default function Chair(props) {
  const [isSelected, setIsSelected] = useState(false);
  const populateClass = () => {
    let defaultClass = " ghe";
    if (props.item.loaiGhe === "Vip") {
      defaultClass += " gheVip";
    }
    if (isSelected) {
      defaultClass += " dangDat";
    }
    if (props.item.daDat) {
      defaultClass += " daDat";
    }
    return defaultClass;
  };
  return (
    <button
    disabled={props.item.daDat}
      className={populateClass()}
      onClick={() => {
        setIsSelected(!isSelected);
        props.handleSelect(props.item);
      }}
    >
      {props.item.tenGhe}
    </button>
  );
}
