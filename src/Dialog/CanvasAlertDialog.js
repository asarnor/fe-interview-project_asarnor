import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function CanvasAlertDialog(props) {
  /** State */
  const [open, setOpen] = useState(false);

  /**
   * init opening of dialog
   */
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  /**
   * close dialog
   */
  const handleClose = () => {
    setOpen(false);
    props.alertHandler(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete: {props.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CanvasAlertDialog.propTypes = {
  name: PropTypes.string,
  open: PropTypes.bool.isRequired,
  alertHandler: PropTypes.func.isRequired
};

CanvasAlertDialog.defaultProps = {
  name: "",
  open: null,
  alertHandler: null
};

export default CanvasAlertDialog;
