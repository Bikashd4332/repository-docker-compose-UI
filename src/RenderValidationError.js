import React from "react";
import {
  ListItemText,
  List,
  ListItem,
  ListItemIcon,
  makeStyles
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

const useStyle = makeStyles(theme => ({
  errorText: {
    color: theme.palette.error.light
  }
}));

export default function RenderValidationError({ validationErrors }) {
  const classes = useStyle();
  const getDerivedErrorStringFromError = validationError => {
    return `The ${validationError.keyword} of ${validationError.dataPath} ${validationError.message}`;
  };
  return (
    <List component="ul" disablePadding={true}>
      {validationErrors.map((validationError, index) => {
        return (
          <ListItem key={index}>
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
  );
}
