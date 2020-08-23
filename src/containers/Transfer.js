import React, { PureComponent } from 'react';
import '../components/Transfer.scss';
import ItemList from '../components/ItemList';


// util fn for intersection and difference
function arrayModifier(arr, arr1, operation) {
  let result = [], tempArr = [];

  // swap the array if required, based on the operation.
  if (operation && arr1.length > arr.length) {
    tempArr = [...arr1];
    arr1 = [...arr];
    arr = tempArr;
  } else if (!operation && arr1.length < arr.length) {
    tempArr = [...arr1];
    arr1 = [...arr];
    arr = tempArr;
  }

  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr1.length; ++j) {
      if (arr[i].id === arr1[j].id) {
        if (operation) {
          result.push(arr[i]);
        } else {
          arr1.splice(j, 1);
          --j;
        }
      }
    }
  }

  if (!operation) {
    return result.concat(arr1);
  }

  return result;
}

// created placeholder while drag and drop in target list
let placeholder = document.createElement("li");
placeholder.className = "placeholder";

class Transfer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      source: props.data, // source - left box
      target: [], // target - right box
      checkedItem: [] // items to be checked
    };

  }

  /* Start - update the state with items which are checked */
  handleCheckbox = (value) => {
    // finding if item is already in checkedlist
    let index = -1;
    for (let i = 0; i < this.state.checkedItem.length; ++i) {
      if (this.state.checkedItem[i].id === value.id) {
        index = i;
        break;
      }
    }

    const checkedList = [...this.state.checkedItem];

    if (index < 0) {
      checkedList.push(value);
    } else {
      checkedList.splice(index, 1);
    }

    this.setState({
      checkedItem: checkedList
    });
  }
  /* End - update the state with items which are checked */

  /* Start - fn to move items from left to right */
  handleCheckedRight = () => {
    let leftChecked = arrayModifier(this.state.source, this.state.checkedItem, true);
    let notChecked = arrayModifier(this.state.source, this.state.checkedItem, false);

    this.setState({
      target: this.state.target.concat(leftChecked),
      source: notChecked,
      checkedItem: []
    })
  };
  /* End - fn to move items from left to right */


  /* Start - fn to move items from right to left */  
  handleCheckedLeft = () => {
    let rightChecked = arrayModifier(this.state.target, this.state.checkedItem, true);
    let notChecked = arrayModifier(this.state.target, this.state.checkedItem, false);

    this.setState({
      source: this.state.source.concat(rightChecked),
      target: notChecked,
      checkedItem: []
    })
  };
  /* Start - fn to move items from right to left */  

  // dragStart(e) {
  //   this.dragged = e.currentTarget;
  //   e.dataTransfer.effectAllowed = 'move';
  //   e.dataTransfer.setData('text/html', this.dragged);
  // }

  // dragEnd(e) {
  //   this.dragged.style.display = 'block';
  //   this.dragged.parentNode.removeChild(placeholder);
    
  //   // update state
  //   var data = this.state.target;
    
  //   var from = this.dragged.dataset.id;
  //   var to = this.over.dataset.id;
  //   if(from < to) to--;
  //   data.splice(to, 0, data.splice(from, 1)[0]);

  //   this.setState({
  //     target: data
  //   });

  //   console.log('data is', data);
  // }

  // dragOver(e) { 
  //   e.preventDefault();
  //   this.dragged.style.display = "none";
  //   if(e.target.className === 'placeholder') return;

  //   this.over = e.target;

  //   e.target.parentNode.insertBefore(placeholder, e.target);
  // }

  render() {

    return (
      <div className="wrapper" data-test="component-transfer">
        <ItemList
          handleCheckbox={this.handleCheckbox}
          items={this.state.source}
          allItems={this.props.data}
          checkboxState={this.state.checkedItem}
          data-test="li-item"
        />

        <div className="arrow-wrapper">
          <div className="arrow-box" onClick={this.handleCheckedRight} >
            <div className="arrow arrow-left" ></div>
          </div>
          <div className="arrow-box" onClick={this.handleCheckedLeft}>
            <div className="arrow arrow-right"></div>
          </div>
        </div>

        <ItemList
          handleCheckbox={this.handleCheckbox}
          items={this.state.target}
          allItems={this.props.data}
          checkboxState={this.state.checkedItem}
          
          // handleOnDragEnd = {this.dragEnd.bind(this)}
          // handleOnDragStart = {this.dragStart.bind(this)}
          // handleOnDragOver = {this.dragOver.bind(this)}
          // dataIndex = {this.props.data.id}
        />
      </div>

    )
  }

}

export default Transfer;