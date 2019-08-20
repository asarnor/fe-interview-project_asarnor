import React from "react";
import PropTypes from "prop-types";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ButtonNav = props => {
  /** State */
  const [value, setValue] = React.useState(null);

  /**
   * determine which button was pressed
   * @param {number} option
   */
  const openDialog = option => {
    switch (option) {
      case 0:
        /** new */
        props.openDialog();
        break;
      case 1:
        /** edit */
        props.openDialog(true);
        break;
      case 2:
        /** alert */
        props.openAlert();
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        openDialog(newValue);
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="New" icon={<OpenInNewIcon />} />
      <BottomNavigationAction label="Edit" icon={<EditIcon />} />
      <BottomNavigationAction label="Delete" icon={<DeleteForeverIcon />} />
    </BottomNavigation>
  );
};

ButtonNav.propTypes = {
  openDialog: PropTypes.func.isRequired,
  openAlert: PropTypes.func.isRequired
};

ButtonNav.defaultProps = {
  openDialog: null,
  openAlert: null
};

export default ButtonNav;
