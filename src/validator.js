import Ajv from "ajv";
import DockerComposeSchema from "./config_definition";

const validate = dataToValidate => {
  const ajv = new Ajv({ schemaId: "id", unknownFormats: false, format: false });
  ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
  let validate = ajv.compile(DockerComposeSchema);
  if (!validate(dataToValidate)) {
    return validate.errors;
  }
  return [];
};

export default validate;
