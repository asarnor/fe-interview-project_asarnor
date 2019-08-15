import React from "react";
import PropTypes from "prop-types";
import CanvasNode from "./CanvasNode";
import CanvasNodeAbstractLogo from "./CanvasNodeAbstractLogo";
import CanvasNodeScaleUp from "./CanvasNodeScaleUp";

/**
 *
 * @param {object} props
 * More-Scale Generator
 */
const CanvasNodeMoreScale = props => {
  /**
   * Use to determine symbols that make More-Scale
   * And Generate them accordingly
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
            />
          );

        default:
          return <CanvasNode key={idx} content={ele} scale={ele.scale} />;
      }
    });
  };
  return (
    <svg x={props.x} y={props.y} className={props.className}>
      <g transform={`scale(${props.scale})`}>{returnGroup()}</g>
    </svg>
  );
};

CanvasNodeMoreScale.propTypes = {
  content: PropTypes.object.isRequired,
  reference: PropTypes.string.isRequired,
  scale: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

CanvasNodeMoreScale.defaultProps = {
  content: null,
  reference: "",
  scale: 1,
  x: 0,
  y: 0
};

export default CanvasNodeMoreScale;
