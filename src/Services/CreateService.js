const V = require("voca");
const createService = entity => {
  const EntityNameInTitleCase = V.titleCase(entity.name);
  const EntityNameInCamelCase = V.camelCase(entity.name);

  return `import axios from "axios";

  import { API_URL } from "../../constants";

  
    
    export const Fetch${EntityNameInTitleCase}s = async () => {
      return axios.get(API_URL +"api/${EntityNameInCamelCase}");
    };
    export const Get${EntityNameInTitleCase}ById = ${EntityNameInCamelCase}Id => {
      return axios
        .get(API_URL +"api/${EntityNameInCamelCase}/" + ${EntityNameInCamelCase}Id);
    };
    export const Create${EntityNameInTitleCase}Record = ${EntityNameInCamelCase} => {
      return axios
        .post(API_URL +"api/${EntityNameInCamelCase}", ${EntityNameInCamelCase});
      
    };
    export const Edit${EntityNameInTitleCase}Record = (${EntityNameInCamelCase}Id, ${EntityNameInCamelCase}) => {
      return axios.put(
        API_URL +"api/${EntityNameInCamelCase}/" + ${EntityNameInCamelCase}Id,
        ${EntityNameInCamelCase}
      );
    };
    export const Delete${EntityNameInTitleCase} = ${EntityNameInCamelCase}Id => {
      return axios.delete(API_URL +"api/${EntityNameInCamelCase}/" + ${EntityNameInCamelCase}Id);
    };
    `;
};
module.exports = { createService };
