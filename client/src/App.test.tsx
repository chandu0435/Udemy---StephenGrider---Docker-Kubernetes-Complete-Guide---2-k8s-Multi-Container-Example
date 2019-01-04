import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Lines inside have been temporarily removed
// because App would try and render out Fibonacci
// but we don't have access to the backend server
// which would cause the test to fail.
// Hence we just won't test for now...

// To actually run this test without the backends running,
// we could create a faker module for the data we need
it('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
