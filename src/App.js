import React, { useState, useEffect } from "react";
import "./App.css";
import CanvasDropdownContainer from "./DropdownSelector/CanvasDropdownContainer";
import ButtonListContainer from "./ButtonList/ButtonListContainer";
import CanvasDialog from "./Dialog/CanvasDialog";
import CanvasAlertDialog from "./Dialog/CanvasAlertDialog";
import ButtonNav from "./Nav/ButtonNav";
import fetchData from "./data/fetchData";
import { Stage, Shape, Container, Shadow } from "@createjs/easeljs";

const App = () => {
  /** State */
  const [data, setData] = useState({});
  const [dropdownItems, setDropdownItems] = useState([]);
  const [contentsList, setContentsList] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectedHighlight, setHighlight] = useState(null);
  const [_stage, setStage] = useState(null);
  const [dialogIsOpen, openDialog] = useState(false);
  const [isEdit, setDialogType] = useState(false);
  const [alertIsOpen, openAlert] = useState(false);

  /**
   * getData gets our data
   */
  const getData = () => fetchData().then(x => x);

  /**
   * Reference canvas element for createjs to work
   */
  const stage = new Stage("myCanvas");

  /**
   * drawSymbol is used to handle root symbols and adds them to the canvas
   * difference between this and nestedSymbol is that this doesnt return a container
   * @param {string} reference
   */
  const drawSymbol = reference => {
    const container = new Container();
    data[reference].contents.forEach(ele => {
      const shape = new Shape();
      shape.name = ele.type;
      switch (ele.type) {
        case "rect":
          shape.graphics
            .beginFill(ele.fill)
            .drawRect(ele.x, ele.y, ele.width, ele.height)
            .endFill();
          container.addChild(shape);
          break;

        case "oval":
          const radius = ele.width / 2;
          shape.graphics
            .beginFill(ele.fill)
            .drawCircle(ele.x + radius, ele.y + radius, radius)
            .endFill();
          container.addChild(shape);
          break;

        default:
          container.addChild(
            drawCustomSymbol(ele.type, ele.scale, ele.x, ele.y)
          );
          break;
      }
      container.name = ele.type;
    });
    stage.addChild(container);
  };

  /**
   * drawCustomSymbol is used to handle nested symbols
   * it returns a container that contains nested symbols
   * @param {string} reference
   * @param {number} scale
   * @param {number} x
   * @param {number} y
   */
  const drawCustomSymbol = (reference, scale = 1, x = 0, y = 0) => {
    const container = new Container();
    data[reference].contents.forEach(ele => {
      const shape = new Shape();
      shape.name = ele.type;
      switch (ele.type) {
        case "rect":
          shape.graphics
            .beginFill(ele.fill)
            .drawRect(ele.x, ele.y, ele.width, ele.height)
            .endFill();
          container.addChild(shape);
          break;

        case "oval":
          const radius = ele.width / 2;
          shape.graphics
            .beginFill(ele.fill)
            .drawCircle(ele.x + radius, ele.y + radius, radius)
            .endFill();
          container.addChild(shape);
          break;

        default:
          container.addChild(
            drawCustomSymbol(ele.type, ele.scale, ele.x, ele.y)
          );
          break;
      }
    });
    container.name = reference;
    container.x = x;
    container.y = y;
    container.scale = scale;
    return container;
  };

  /**
   * setCanvasWidthHeight sets the width and height of canvas dynamically
   * before it renders
   * @param {string} reference
   */
  const setCanvasWidthHeight = reference => {
    const canvas = document.getElementById("myCanvas");
    canvas.width = data[reference].width;
    canvas.height = data[reference].height;
  };

  /**
   * highlightSymbol is used to capture the index of
   * the selected symbol from the list and highlight it
   * on the canvas
   * @param {number} idx
   */
  const highlightSymbol = idx => {
    /**
     * we first need to reset all highlighted symbols
     */
    _stage.children[0].children.forEach(ele => {
      ele.shadow = null;
      ele.alpha = 1;
    });

    /**
     * identify and highlight the selected symbol
     */
    _stage.children[0].getChildAt(idx).shadow = new Shadow("pink", 5, 5, 5);
    _stage.children[0].getChildAt(idx).alpha = 0.5;
  };

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
    setSelectedSymbol(_symbol);
    /** reset highlight */
    setHighlight(null);
    stage.clear();
    /** get symbol's contents using selected */
    setContentsList(data[_symbol].contents.map(ele => ele.type));
    /** set the proper width and height to canvas area */
    setCanvasWidthHeight(_symbol);
    /** draw symbols on canvas */
    drawSymbol(_symbol);
    /** update the stage */
    stage.update();
    /** set stage object for createjs */
    setStage(stage);
  };

  /**
   *
   * @param {number} index
   */
  const highlightHandler = index => {
    highlightSymbol(index);
    setHighlight(index);
    _stage.update();
  };

  /**
   * used to open edit or new dialog
   * @param {boolean} edit
   */
  const isDialogOpen = edit => {
    if (!dialogIsOpen) {
      setDialogType(edit);
      if (selectedSymbol === "" && edit) {
        /** they must select from the dropdown to edit */
        alert("select symbol from dropdown to edit");
        return;
      }
      openDialog(true);
    }
  };

  /**
   * close dialog
   */
  const closeDialog = () => {
    openDialog(false);
  };

  /**
   * open and close alert dialog
   * @param {boolean} isOpen
   */
  const alertHandler = isOpen => {
    if (selectedSymbol === "") {
      /** they must select from the dropdown to delete */
      alert("select symbol from dropdown to delete");
      return;
    }
    openAlert(isOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ButtonNav
          openDialog={isDialogOpen}
          openAlert={() => {
            alertHandler(true);
          }}
        />
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
        {(!data || selectedSymbol === "") && <div>No symbol selected...</div>}
        <canvas id="myCanvas" />
      </section>
      <CanvasDialog
        open={dialogIsOpen}
        closeDialog={closeDialog}
        isEdit={isEdit}
        name={selectedSymbol}
        data={data[selectedSymbol]}
      />
      <CanvasAlertDialog
        open={alertIsOpen}
        alertHandler={alertHandler}
        name={selectedSymbol}
      />
    </div>
  );
};

export default App;
