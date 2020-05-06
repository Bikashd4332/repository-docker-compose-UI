import React, { useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  makeStyles,
  Paper,
  Fab,
  Snackbar,
  CssBaseline,
  Box,
  Grid
} from "@material-ui/core";
import ReactJson from "react-json-view";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";
import { Alert } from "@material-ui/lab";
import PropertyNameAutoComplete from "./PropertyNameAutoComplete";
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
  }
}));

const options = [
  { id: 1, propertyName: "labels", type: "object" },
  { id: 2, propertyName: "cache_from", type: "array" }
];

const defaultComposeSkeleton = {
  environments: {},
  command: [],
  configs: {}
};

function App() {
  const classes = useStyle();
  const [dockerComposeYaml, setDockerComposeYaml] = useState(
    defaultComposeSkeleton
  );
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [propertyName, setPropertyName] = useState(options[0]);
  const [isFieldRendered, setIsFieldRendered] = useState(false);

  const handlePropertyAdd = () => {
    setIsFieldRendered(false);
    console.log(`User requests to add: ${propertyName}`);
  };
  const onEdit = _ => {
    console.log("User wanted to add some value");
    return {};
  };

  const onDelete = _ => {
    console.log("User wanted to add some value");
    return {};
  };

  const handlePropertyAdd = 

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
                onAdd={e => {
                  console.log(e);
                  return true;
                }}
                onDelete={onDelete}
                onEdit={onEdit}
                name="project-db11234"
              />
            </div>
            <Fab
              size="small"
              color="primary"
              className={classes.addJSONProp}
              onClick={() => setIsFieldRendered(!isFieldRendered)}
            >
              <AddIcon />
            </Fab>
            <Fab
              size="small"
              color="primary"
              className={classes.addJSONProp}
              onClick={validAndSubmit}
            />
            {isFieldRendered && (
              <div className={classes.configSelectorContainer}>
                <Paper elevation={3} className={classes.configSelectorWrapper}>
                  <PropertyNameAutoComplete
                    propertyName={propertyName}
                    handlePropertyAdd={handlePropertyAdd}
                    getOptionLabel={option => option.propertyName}
                  />
                </Paper>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={isSnackBarOpen} autoHideDuration={6000}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
}

export default App;

export default App;
export default App;
