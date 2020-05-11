import Ajv from "ajv";
import schema_v1 from "./config_definition_v1.0";
import schema_v2 from "./config_definition_v2.4";
import schema_v3 from "./config_definition_v3.8";

/*
 * The docker compose constructed json will be validated against their
 * own json scchema for accordance.
 * @param dataToValidate {} - The data to validate against the schema.
 * @returnss Arryay[Validations]
 */
const validator = (dataToValidate, composeVersion) => {
  // find out which schema is specified to validate json data with.
  let schemaVer =
    composeVersion === 1
      ? schema_v1
      : composeVersion > 2 && composeVersion <= 2.4
      ? schema_v2
      : schema_v3;

  // ajv should not throw errors on encoutering format
  // that it does not know.
  const ajv = new Ajv({
    schemaId: "id",
    allErrors: true,
    unknownFormats: false,
    format: false
  }).addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
  // check which schema is provided and load that appropriate schema

  const validate = ajv.compile(schemaVer);
  return !validate(dataToValidate) ? validate.errors : [];
};

/*
 * Iterate on each of property or index of dataToValidate with given namespace
 * and find there should be no empty type present in object.
 * @param dataToValidate: any
 * @param namespace: String
 * @returns [String..]
 */
const emptyValidator = (dataToValidate, namespace) => {
  const validationMessages = [];
  const value = getValueFromNamespace(dataToValidate, namespace);

  switch (typeof value) {
    case "array":
      // If its an array and it has no items then .
      if (value.length === 0) {
        return `${readableNamespace(namespace)} can not have none items.`;
      }
      value.forEach((_, index) => {
        const validationMessage = emptyValidator(
          dataToValidate,
          namespace + `/${index}}`
        );
        validationMessage && validationMessage.push(validationMessage);
      });
      return [].concat.apply([], validationMessages);
    case "object":
      if (value === null) {
        return `${readableNamespace(
          namespace
        )} can not have null or undefined.`;
      }

      const keys = Object.keys(value);
      // If its an object and it has none keys.
      if (keys.length === 0) {
        return `${readableNamespace(namespace)} at least should have one item.`;
      }
      keys.forEach(propertyName => {
        const validationMessage = emptyValidator(
          dataToValidate,
          namespace + `/${propertyName}`
        );
        validationMessage && validationMessages.push(validationMessage);
      });
      return [].concat.apply([], validationMessages);
    case "string":
      return value === ""
        ? `${readableNamespace(namespace)} can not contain empty string.`
        : undefined;
    default:
      return `${readableNamespace(
        namespace
      )} can not contain null or undefined.`;
  }
};

const getValueFromNamespace = (dataToValidate, namespace) => {
  //removing # which means the root object reference
  let valuetoReturn = dataToValidate;
  // walk up the namespace to relative the value.
  namespace.split("/").forEach(propertyName => {
    valuetoReturn = valuetoReturn[propertyName];
  });
  return valuetoReturn;
};

const readableNamespace = namespace => {
  return namespace
    .split("/")
    .map(item => `[${item}]`)
    .join("");
};

export { validator, emptyValidator };
