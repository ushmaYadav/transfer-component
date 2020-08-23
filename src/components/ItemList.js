import React from "react";
import SingleItem from "./SingleItem";

const ItemList = (props) => {
  let itemArr = props.items;

  if(itemArr.length === 0){
    return <ul className= "list" onDragOver={props.handleOnDragOver}></ul>;
  }

  let handleCheckbox = props.handleCheckbox;
  let checkboxState = props.checkboxState;

  let listItems = itemArr.map((itemObj, i) => {
    return (
      <SingleItem
        key={itemObj.id}
        data={itemObj}
        onClick={() => handleCheckbox(itemObj)}
        checkedValue= {checkboxState.filter(item => (item.id === itemObj.id)).length > 0}
       
        // handleOnDragEnd={props.handleOnDragEnd}
        // handleOnDragStart={props.handleOnDragStart}
        // dataIndex = {itemObj.id}
      />
    );
  });

  return <ul className= "list" onDragOver={props.handleOnDragOver}>{listItems}</ul>;
}



export default ItemList;