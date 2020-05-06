import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  optionLabel: {
    width: "100%",
    display: "block"
  },
  optionDescription: {
    width: "100%",
    display: "block",
    fontSize: 11,
    color: theme.palette.text.secondary
  }
}));

export default function({ option }) {
  const classes = useStyle();
  return (
    <>
      <Typography
        component="div"
        className={classes.optionLabel}
        variant="body1"
      >
        {option.propertyName}
      </Typography>
      <Typography
        component="i"
        variant="body2"
        className={classes.optionDescription}
      >
        Property {option.propertyName} of type {option.type}
      </Typography>
    </>
  );
}
