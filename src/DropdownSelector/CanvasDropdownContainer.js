import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
/**
 * 
 * @param {object} props 
 */
const CanvasDropdownContainer = props => {
  const classes = useStyles();

  const [stateSelected, setStateSelected] = useState("");

  /**
   *
   * @param {object} event
   */
  const handleChange = event => {
    /** set current state */
    setStateSelected(event.target.value);
    /** set symbol when clicked */
    props.setSymbol(event.target.value);
  };

  /**
   * Loop dropdown data and create menu items to display
   */
  const DropdownItems = () => {
    return props.dropData.map((item, idx) => {
      return (
        <MenuItem key={idx} value={item}>
          {item}
        </MenuItem>
      );
    });
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="symbol">Symbol</InputLabel>
        <Select
          value={stateSelected}
          onChange={handleChange}
          inputProps={{
            name: "Symbol",
            id: "symbol"
          }}
        >
          {DropdownItems()}
        </Select>
      </FormControl>
    </form>
  );
};

CanvasDropdownContainer.propTypes = {
  dropData: PropTypes.array.isRequired,
  setSymbol: PropTypes.func.isRequired
};

CanvasDropdownContainer.defaultProps = {
  dropData: null,
  setSymbol: null
};

export default CanvasDropdownContainer;
