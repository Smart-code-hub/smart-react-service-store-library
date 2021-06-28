var assert = require("assert");
const {entityList,metaData} = require(".//entity");
const { ProcessService } = require("../index");
const result = ProcessService(entityList[0],'ReactFirebase');
console.log(result);

