import Ajv from "ajv";
import DockerComposeSchema from "./config_definition";

const validator = dataToValidate => {
  const ajv = new Ajv({ schemaId: "id", unknownFormats: false, format: false });
  ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));
  let validate = ajv.compile(DockerComposeSchema);
  if (!validate(dataToValidate)) {
    return validate.errors;
  }
  return [];
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
        return `${readableNamespace(namespace)} can not have none propert.`;
      }
      value.forEach((item, index) => {
        const validationMessage = emptyValidator(
          dataToValidate,
          namespace + `/${index}}`
        );
        validationMessage && validationMessage.push(validationMessage);
      });
      return validationMessages;
    case "object":
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
      return validationMessages;
    case "string":
      return value === ""
        ? `${readableNamespace(namespace)} can not contain empty string.`
        : undefined;
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
