import React, { useState } from "react";
import { LoaiGhe } from "../../enums/common";
import "./chair.scss";

export default function Chair(props) {
  // đặt state set class cho ghế
  const [isSelected, setIsSelected] = useState(false);
  const populateClass = () => {
    // ghe bình thường
    let defaultClass = " ghe";

    // ghế vip
    if (props.item.loaiGhe === LoaiGhe.Vip) {
      defaultClass += " gheVip";
    }
    // ghế mình đang chọn
    if (isSelected) {
      defaultClass += " dangDat";
    }
    // ghế đã đặt
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
