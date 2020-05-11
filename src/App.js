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
import DownloadIcon from "@material-ui/icons/GetApp";
import RenderValidationError from "./RenderValidationError";
import { validator, emptyValidator } from "./validator";
import YAML from "json2yaml";
import "typeface-roboto";

const useStyle = makeStyles(theme => ({
  container: {
    alignItems: "center"
  },
  root: {
    padding: theme.spacing(3),
    width: "100%"
  },
  jsonTreeRoot: {
    overflow: "scroll",
    width: "100%",
    height: 400
  },
  jsonTreeWrapper: {
    width: "100%",
    position: "relative"
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
    bottom: theme.spacing(5),
    right: theme.spacing(5)
  },
  errorContainer: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  exportFab: {
    position: "absolute",
    bottom: theme.spacing(5),
    right: theme.spacing(12)
  }
}));

const defaultComposeSkeleton = {
  configs: ["PATH:/var/app/bin"],
  build: {
    context: ".",
    dockerfile: "docker/development/Dockerfile"
  },
  env_file: "docker/development/.env",
  ports: ["3000:,80"]
};

function App({
  projectName = "project-db11234",
  dockerComposeYamlDefault = defaultComposeSkeleton,
  composeVersion = 3
}) {
  const classes = useStyle();
  const [dockerComposeYaml, setDockerComposeYaml] = useState(
    dockerComposeYamlDefault
  );
  const [validationMessages, setValidationMessages] = useState([]);

  const onEdit = payload => {
    // Should always validate with the choosen schema
    setDockerComposeYaml(payload.updated_src);
    validate(payload.updated_src);
  };

  const onDelete = payload => {
    console.log(payload);
    setDockerComposeYaml(payload.updated_src);
    setValidationMessages([]);
  };

  const onAdd = payload => {
    // should check that there is no existing property exists which has
    // null stored in it.
    const emptyValidation = [].concat.apply(
      [],
      emptyValidator({ [projectName]: dockerComposeYaml }, projectName)
    );
    if (emptyValidation && emptyValidation.length) {
      setValidationMessages(emptyValidation);
      // we can cannot accept new changes.
      const duped = JSON.parse(JSON.stringify(dockerComposeYaml));
      setDockerComposeYaml(duped);
      return false;
    }
    setDockerComposeYaml(payload.updated_src);
    setValidationMessages([]);
  };

  const validate = () => {
    const dockerComposeYamlWrapped = { [projectName]: dockerComposeYaml };
    // validation for valid docker compose structur.
    // against the given version.
    const messages = validator(dockerComposeYamlWrapped, composeVersion);
    setValidationMessages(messages);
  };

  const validateAndSubmit = () => {
    validate();
    const isValid = validationMessages.length === 0;
    if (isValid) {
      console.log("YAML pushed");
    } else {
      console.log("There are errors");
    }
  };

  const validateAndExport = () => {
    const dockerComposeYamlWrapped = { [projectName]: dockerComposeYaml };
    validate();
    const isValid = validationMessages.length === 0;
    if (isValid) {
      console.log(YAML.stringify(dockerComposeYamlWrapped));
    }
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
          <Grid item class={classes.jsonTreeWrapper}>
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
                  validationMessage="Please verify that no tags should have empty values."
                  onDelete={onDelete}
                  onEdit={onEdit}
                  name={projectName}
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
              <Fab
                size="small"
                color="primary"
                className={classes.exportFab}
                onClick={validateAndExport}
              >
                <DownloadIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid item className={classes.errorContainer}>
            {validationMessages.length > 0 && (
              <RenderValidationError validationErrors={validationMessages} />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
