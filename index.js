const prettier = require("prettier");
const { createService } = require("./src/Services/CreateService");
const V = require("voca");
const {createFirebaseService} = require("./src/Services/createFirebaseService");
const {createFirebaseConfig} = require("./src/Configs/createFirebaseConfig");
const ProcessService = (entity, serverLessType = null) => {
  try {
    let serviceContent = "";
    let ServerLessConfig = ''
    // we will generate all components here related to crud
    if (!serverLessType) {
      serviceContent = createService(entity);
    } else {
      switch (serverLessType) {
        case "ReactFirebase":
          {
          serviceContent = createFirebaseService(entity);
          ServerLessConfig = createFirebaseConfig(entity);

          break;
          }
        default:
          break;
      }
    }
    let servicesContent = [
      {
        data: prettier.format(serviceContent),
        servicePath: `Services/${V.titleCase(
          entity.name
        )}/${entity.name.toLowerCase()}Service.js`,
      },
    ];

    if (serverLessType){
      servicesContent = [...servicesContent,
      {
        data: prettier.format(ServerLessConfig),
        servicePath: `Services/firebase.config.js`,
      }]
    }


    return servicesContent;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  ProcessService,
};
