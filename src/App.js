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
import RenderValidationError from "./components/RenderValidationError";
import { validator, emptyValidator } from "./components/validator";
import YAML from "json2yaml";
import "typeface-roboto";
import testSchema from './schema/testSchema.json'

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    width: "100%"
  },
  container: {
    alignItems: "center"
  },
  jsonTreeRoot: {
    position: "relative",
    overflow: "scroll",
    width: "100%",
    height: 400
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
  errorContainer: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  exportFab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(9)
  }
}));

const defaultComposeSkeleton = {
  configs: ["PATH:/var/app/bin"],
  build: {
    context: ".",
    dockerfile: "docker/development/Dockerfile"
  },
  env_file: "docker/development/.env",
  ports: ["3000:80"]
};

function App({
  projectName = "project-db11234",
  dockerComposeYamlDefault = testSchema[0]
}) {
  const classes = useStyle();
  const [dockerComposeYaml, setDockerComposeYaml] = useState(
    dockerComposeYamlDefault
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

  const validate = () => {
    const dockerComposeYamlWrapped = { ...dockerComposeYaml };
    // validation for valid docker compose structur.
    const messages = validator(dockerComposeYamlWrapped);
    // check if any property is empty
    // const emptyValidation = [].concat.apply(
    //   [],
    //   emptyValidator(dockerComposeYamlWrapped, "project-db11234")
    // );
    // messages.length === 0 && messages.push(...emptyValidation);
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
                name={projectName}
                displayDataTypes={false}
                displayObjectSize={false}
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
