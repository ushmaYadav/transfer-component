import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import Transfer from './Transfer';

Enzyme.configure({ adapter: new EnzymeAdapter()});

/** 
 * factory function for create shallow wrapper 
 * function
**/

const setup = (props = {}, state = null) =>{
  return shallow(<Transfer {...props}/>);
}


test('renders transfer component without error', () => {
  const wrapper = setup();
  const transferComponent = wrapper.find("[data-test='component-transfer']");
  expect(transferComponent.length).toBe(1);
});

test('render target initial state to be empty array' , () => {
  const wrapper = setup();
  const intitalTargetState = wrapper.state('target');
  expect(intitalTargetState.length).toEqual(0); 
});

test('click on source list items' , () => {
  const wrapper = setup();
  const checkboxSource = wrapper.find("[data-test='li-item']");
  checkboxSource.simulate('click');
});
