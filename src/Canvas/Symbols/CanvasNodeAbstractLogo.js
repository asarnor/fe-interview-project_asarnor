import React from "react";
import PropTypes from "prop-types";
import CanvasNode from "./CanvasNode";

/**
 *
 * @param {object} props
 * Abstract-Logo symbol generator
 */
const CanvasNodeAbstractLogo = props => {
  /**
   * Use to determine symbols that make Abstract
   * And Generate them accordingly
   */
  const returnGroup = () => {
    return props.content[props.reference].contents.map((ele, idx) => {
      return <CanvasNode key={idx} content={ele} scale={props.scale} />;
    });
  };
  return (
    <svg x={props.x} y={props.y} className={props.className}>
      {returnGroup()}
    </svg>
  );
};

CanvasNodeAbstractLogo.propTypes = {
  content: PropTypes.object.isRequired,
  reference: PropTypes.string.isRequired,
  scale: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

CanvasNodeAbstractLogo.defaultProps = {
  content: null,
  reference: "",
  scale: 1,
  x: 0,
  y: 0
};

export default CanvasNodeAbstractLogo;
