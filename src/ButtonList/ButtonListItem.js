import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const ButtonListItem = props => {
  /**
   *
   * @param {object} event
   */
  const handleItemClick = event => {
    /** trigger parent function to determine what item was clicked
     * and we are able to highlight the symbol on the canvas
     */
    props.clickHandler(event.target.value, props.idx);
  };

  return (
    <>
      <ListItem
        button
        selected={props.selected}
        onClick={event => handleItemClick(event)}
      >
        <ListItemText primary={props.name} />
      </ListItem>
      <Divider />
    </>
  );
};

ButtonListItem.propTypes = {
  clickHandler: PropTypes.func,
  idx: PropTypes.number,
  name: PropTypes.string,
  selected: PropTypes.bool
};

ButtonListItem.defaultProps = {
  clickHandler: null,
  idx: null,
  name: null,
  selected: false
};

export default ButtonListItem;
