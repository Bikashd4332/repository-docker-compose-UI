const Ajv = require("ajv");
const fs = require("fs");

const dataToValidate = { version: "3.8", services: [1, 2, 3] };

const ajv = new Ajv({ schemaId: "id", unknownFormats: false, format: false });
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
fs.readFile("../config_definition.json", (_, schemaBuffer) => {
  const schemaObj = JSON.parse(schemaBuffer);
  let validate = ajv.compile(schemaObj);
  if (!validate(dataToValidate)) {
    console.log(validate.errors);
  }
});
