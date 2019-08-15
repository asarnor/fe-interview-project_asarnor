import React, { useState, useEffect } from "react";
import "./App.css";
import CanvasDropdownContainer from "./DropdownSelector/CanvasDropdownContainer";
import ButtonListContainer from "./ButtonList/ButtonListContainer";
import CanvasContainer from "./Canvas/Symbols/CanvasContainer";
import fetchData from "./data/fetchData";

/**
 * getData gets our data
 */
const getData = () => fetchData().then(x => x);

const App = () => {
  const [data, setData] = useState({});
  const [dropdownItems, setDropdownItems] = useState([]);
  const [contentsList, setContentsList] = useState([]);
  const [selectedSymbol, setSymbol] = useState("");
  const [selectedHighlight, setHighlight] = useState(null);

  useEffect(() => {
    /** async call to request our data */
    const requestData = async () => {
      const result = await getData();

      /** data is ready! */
      setData(result);
      /** get dropdown items */
      setDropdownItems(Object.keys(result));
    };

    requestData();
  }, []);

  /**
   * 
   * @param {string} _symbol 
   */
  const symbolSetter = _symbol => {
    /** set symbol */
    setSymbol(_symbol);
    /** reset highlight */
    setHighlight(null);
    /** get symbol's contents using selected */
    setContentsList(data[_symbol].contents.map(ele => ele.type));
  };

  /**
   * 
   * @param {number} index 
   */
  const highlightHandler = index => {
    setHighlight(index);
  };

  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <header className="App-header">
          <CanvasDropdownContainer
            dropData={dropdownItems}
            setSymbol={symbolSetter}
          />
          <ButtonListContainer
            listData={contentsList}
            clickHandler={highlightHandler}
            selectedId={selectedHighlight}
          />
        </header>
        <section>
          {data && selectedSymbol ? (
            <CanvasContainer
              content={data}
              reference={selectedSymbol}
              selectedId={selectedHighlight}
            />
          ) : (
            <div>No symbol selected...</div>
          )}
        </section>
      </React.Suspense>
    </div>
  );
};

export default App;
