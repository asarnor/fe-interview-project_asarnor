import React from "react";
import PropTypes from "prop-types";

const CanvasNode = props => {
  /**
   * Use to determine base svg element and apply properties from
   * content data
   */
  const returnSVG = () => {
    switch (props.content.type) {
      case "rect":
        return (
          <rect
            width={props.content.width}
            height={props.content.height}
            x={props.content.x}
            y={props.content.y}
            fill={props.content.fill}
            className={props.className}
            transform={`scale(${props.scale})`}
          />
        );

      /** oval could translate as ellipse or circle
       *  I choose ellipse because it was not specified
       */
      case "oval":
        /**
         * content properties from translate unique against regular svg
         * i converted it so it matches the design expectations
         * example: cx requires (x+width/2) because our app positions
         * from the top left of the element, not the center
         */
        return (
          <ellipse
            rx={props.content.width / 2}
            ry={props.content.height / 2}
            cx={props.content.x + props.content.width / 2}
            cy={props.content.y + props.content.height / 2}
            fill={props.content.fill}
            className={props.className}
            transform={`scale(${props.scale})`}
          />
        );

      default:
        return <>error</>;
    }
  };

  return <>{props.content ? returnSVG() : <div>loading....</div>}</>;
};

CanvasNode.propTypes = {
  content: PropTypes.object.isRequired,
  scale: PropTypes.number
};

CanvasNode.defaultProps = {
  content: null,
  scale: 1
};

export default CanvasNode;
