/**
 * @file test.jsx
 * React testファイル
 */

import React, { useState } from 'react'; // https://ja.reactjs.org/docs/hooks-intro.html
import ReactDOM from 'react-dom'; // https://ja.reactjs.org/docs/react-dom.html
import styled from 'styled-components'; // https://styled-components.com/

const Button = styled.button`
  color: ${(props) => props.primary}
`;

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <Button
      primary="blue"
      type="button"
      value="test"
      onClick={() => setCount(count + 1)}
    >test count: {count}</Button>
  );
};

ReactDOM.render(
  <Counter />, document.getElementById('js-app')
);
