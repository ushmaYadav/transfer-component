import React from 'react';
import './commonStyles/common.scss';
import './App.css';
import Transfer from './containers/Transfer';
import ErrorBoundary from './ ErrorBoundary';

const mockData = [];

for (let i = 0; i < 5; i++) {
  mockData.push({
    id: i,
    name: `Content${i + 1}`,
  });
}

function App() {
  return (
    <ErrorBoundary>
      <div className="App" data-test="component-app">
          <Transfer data={mockData}/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
