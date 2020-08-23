import React from "react";

const SingleItem = (props) => {
  return(
    <li onClick={props.onClick}
      // draggable='true'
      // onDragEnd={props.handleOnDragEnd}
      // onDragStart={props.handleOnDragStart}
      // onDrop = {props.handleOnDrop}
      // data-id={props.dataIndex}
    >
      <input type="checkbox" checked={props.checkedValue} onChange={() => {}}/>
      <span> {props.data.name} </span>
    </li>
  );
}

export default SingleItem;