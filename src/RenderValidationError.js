import React from "react";
import {
  ListItemText,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  makeStyles
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

const useStyle = makeStyles(theme => ({
  errorText: {
    color: theme.palette.error.main
  }
}));

export default function RenderValidationError({ validationErrors }) {
  const classes = useStyle();
  const getDerivedErrorStringFromError = validationError => {
    return typeof validationError !== "string"
      ? `The ${validationError.keyword} of ${validationError.dataPath} ${validationError.message}`
      : validationError;
  };
  return (
    <>
      <Typography component="h4" color="error">
        Errors Encountered
      </Typography>
      <List component="ul">
        {validationErrors.map((validationError, index) => {
          return (
            <ListItem key={index} disableGutters>
              <ListItemIcon>
                <ErrorIcon color="error" />
              </ListItemIcon>
              <ListItemText
                classes={{ secondary: classes.errorText }}
                secondary={getDerivedErrorStringFromError(validationError)}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
