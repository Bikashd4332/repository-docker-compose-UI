import React, { useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  makeStyles,
  Paper,
  Fab,
  CssBaseline,
  Box,
  Grid
} from "@material-ui/core";
import ReactJson from "react-json-view";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import PublishIcon from "@material-ui/icons/Publish";
import RenderValidationError from "./RenderValidationError";
import validator from "./validator";
import "typeface-roboto";

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    width: "100%"
  },
  container: {
    width: "auto",
    alignItems: "center"
  },
  jsonTreeRoot: {
    position: "relative",
    width: "100%"
  },
  header: {
    padding: theme.spacing(1, 4, 1),
    backgroundColor: theme.palette.background.default
  },
  tree: {
    padding: theme.spacing(2, 3)
  },
  addJSONProp: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  configSelectorContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  configSelectorWrapper: {
    width: "50%",
    padding: 10,
    left: "50%",
    top: "50%",
    right: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    zIndex: 300
  },
  optionLabel: {
    width: "100%",
    display: "block"
  },
  optionDescription: {
    width: "100%",
    display: "block",
    fontSize: 11,
    color: theme.palette.text.secondary
  },
  errorContainer: {
    width: "100%",
    marginTop: theme.spacing(3)
  }
}));

const defaultComposeSkeleton = {
  environment: 1,
  command: [],
  configs: []
};

function App() {
  const classes = useStyle();
  const [dockerComposeYaml, setDockerComposeYaml] = useState(
    defaultComposeSkeleton
  );
  const [validationMessages, setValidationMessages] = useState([]);

  const onEdit = payload => {
    console.log(payload);
    setDockerComposeYaml(payload.updated_src);
    setValidationMessages([]);
  };

  const onDelete = payload => {
    console.log(payload);
    setDockerComposeYaml(payload.updated_src);
    setValidationMessages([]);
  };

  const onAdd = payload => {
    console.log(payload);
    setDockerComposeYaml(payload.updated_src);
    setValidationMessages([]);
  };

  const validateAndSubmit = () => {
    const dockerComposeYamlWrapped = { "project-db11234": dockerComposeYaml };
    setValidationMessages(validator(dockerComposeYamlWrapped));
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Grid
          container
          className={classes.root}
          alignItems="center"
          justify="center"
        >
          <Grid
            item
            component={Paper}
            className={classes.jsonTreeRoot}
            elevation={3}
          >
            <Grid
              container
              component={Box}
              justify="space-between"
              className={classes.header}
            >
              <Typography variant="body1" component="h1">
                Docker-compose YAML
              </Typography>
              <IconButton color="default" size="small">
                <ExpandLessIcon />
              </IconButton>
            </Grid>
            <div className={classes.tree}>
              <ReactJson
                src={dockerComposeYaml}
                onAdd={onAdd}
                onDelete={onDelete}
                onEdit={onEdit}
                name="project-db11234"
              />
            </div>
            <Fab
              size="small"
              color="primary"
              className={classes.addJSONProp}
              onClick={validateAndSubmit}
            >
              <PublishIcon />
            </Fab>
          </Grid>
          <Grid item className={classes.errorContainer}>
            {<RenderValidationError validationErrors={validationMessages} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
