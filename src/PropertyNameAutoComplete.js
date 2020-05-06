import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import OptionRender from "./OptionRender";
import Options from "./ComposerProperties";

export default function({ propertyName, handlePropertyAdd, getOptionLabel }) {
  return (
    <Autocomplete
      size="small"
      value={propertyName}
      onChange={handlePropertyAdd}
      options={Options}
      getOptionLabel={getOptionLabel}
      renderOption={option => <OptionRender option={option} />}
      renderInput={params => (
        <TextField
          {...params}
          label="Select property to add"
          variant="outlined"
        />
      )}
    />
  );
}
