import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ButtonListItem from "./ButtonListItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));
/**
 * 
 * @param {object} props 
 */
const ButtonListContainer = props => {
  const classes = useStyles();

  /**
   * 
   * @param {*} event 
   * @param {number} index 
   * Used to determie what button was pressed
   */
  const handleListItemClick = (event, index) => {
    props.clickHandler(index);
  };

  /**
   * 
   * @param {number} idx
   * used to highlight the selected button
   */
  const highlightButton = idx => {
    return props.selectedId === idx;
  };

  /**
   * 
   * @param {object} data 
   * use data to populate list of buttons
   */
  const getItems = data => {
    if (!data) {
      return;
    }

    return data.map((item, idx) => {
      return (
        <ButtonListItem
          key={idx}
          name={item}
          idx={idx}
          clickHandler={handleListItemClick}
          selected={highlightButton(idx)}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <List component="ul" aria-label="main mailbox folders">
        {props.listData.length > 0 ? (
          getItems(props.listData)
        ) : (
          <div>Select from the Dropdown</div>
        )}
      </List>
    </div>
  );
};

ButtonListContainer.propTypes = {
  clickHandler: PropTypes.func,
  selectedId: PropTypes.number
};

ButtonListContainer.defaultProps = {
  clickHandler: null,
  selectedId: null
};

export default ButtonListContainer;
