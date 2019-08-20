import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

const CanvasDialog = props => {
  /** State */
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    width: "",
    height: ""
  });

  /**
   * dialog init open hook
   */
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  /**
   * dialog hook to determine if its new or edit mode
   */
  useEffect(() => {
    if (props.isEdit) {
      setValues({ ...props.data, name: props.name });
    }
  }, [props.data, props.name, props.isEdit]);

  /**
   * close dialog
   */
  const handleClose = () => {
    props.closeDialog();
    setOpen(false);
  };

  /**
   *
   * @param {object} prop
   */
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.isEdit ? <div>Edit Symbol</div> : <div>New Symbol</div>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out symbol properties.
          </DialogContentText>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Name"
              type="text"
              onChange={handleChange("name")}
              value={values.name}
              className={classes.textField}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="width"
              label="Width"
              type="number"
              onChange={handleChange("width")}
              value={values.width}
              className={classes.textField}
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="height"
              label="height"
              type="number"
              onChange={handleChange("height")}
              value={values.height}
              className={classes.textField}
              InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CanvasDialog.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  open: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired
};

CanvasDialog.defaultProps = {
  data: {},
  name: "",
  open: null,
  isEdit: false
};

export default CanvasDialog;
