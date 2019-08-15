import React from "react";
import PropTypes from "prop-types";
import CanvasNode from "./CanvasNode";
import CanvasNodeAbstractLogo from "./CanvasNodeAbstractLogo";
import CanvasNodeScaleUp from "./CanvasNodeScaleUp";
import CanvasNodeMoreScale from "./CanvasNodeMoreScale";

const CanvasContainer = props => {
  /**
   *
   * @param {number} idx
   * used to determine if an symbol is highlighted
   */
  const highlightHandler = idx => {
    if (props.selectedId === idx) {
      return "highlighted-symbol";
    } else {
      return "";
    }
  };

  /**
   * used to parse contents of selected symbol
   * man-stract is assumed to be a free for all
   */
  const returnGroup = () => {
    return props.content[props.reference].contents.map((ele, idx) => {
      switch (ele.type) {
        case "abstract-logo":
          return (
            <CanvasNodeAbstractLogo
              key={idx}
              content={props.content}
              reference={ele.type}
              scale={ele.scale}
              x={ele.x}
              y={ele.y}
              className={highlightHandler(idx)}
            />
          );

        case "scale-up":
          return (
            <CanvasNodeScaleUp
              key={idx}
              content={props.content}
              reference={ele.type}
              scale={ele.scale}
              x={ele.x}
              y={ele.y}
              className={highlightHandler(idx)}
            />
          );

        case "more-scale":
          return (
            <CanvasNodeMoreScale
              key={idx}
              content={props.content}
              reference={ele.type}
              scale={ele.scale}
              x={ele.x}
              y={ele.y}
              className={highlightHandler(idx)}
            />
          );

        default:
          return (
            <CanvasNode
              key={idx}
              content={ele}
              scale={ele.scale}
              className={highlightHandler(idx)}
            />
          );
      }
    });
  };
  return (
    <svg
      className="mainSVG"
      width={props.content[props.reference].width}
      height={props.content[props.reference].height}
      xmlns="http://www.w3.org/2000/svg"
    >
      {returnGroup()}
    </svg>
  );
};

CanvasContainer.propTypes = {
  content: PropTypes.object.isRequired,
  reference: PropTypes.string.isRequired,
  scale: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  selectedId: PropTypes.number
};

CanvasContainer.defaultProps = {
  content: null,
  reference: "",
  scale: 1,
  x: 0,
  y: 0,
  selectedId: null
};

export default CanvasContainer;
