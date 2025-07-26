import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <ParentComponent />
    </>
  )
}

import { useCallback } from 'react';

const ParentComponent = () => {
  const handleParentClick = useCallback((event) => {
    console.log('Parent clicked');
  }, []);

  return (
    <div onClick={handleParentClick} style={{ padding: '20px', border: '1px solid #ccc' }}>
      <ChildComponent />
    </div>
  );
};

const ChildComponent = () => {
  const handleChildClick = useCallback((event) => {
    console.log('Child clicked');
    // 阻止事件冒泡
    // event.stopPropagation();
  }, []);

  return (
    <div onClick={handleChildClick} style={{ padding: '10px', background: '#f0f0f0' }}>
      <GrandchildComponent />
    </div>
  );
};

const GrandchildComponent = () => {
  const handleGrandchildClick = useCallback((event) => {
    console.log('Grandchild clicked');
  }, []);

  return (
    <button onClick={handleGrandchildClick}>
      Click me
    </button>
  );
};
export default App
