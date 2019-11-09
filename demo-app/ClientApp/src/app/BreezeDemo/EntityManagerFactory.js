"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var breeze_client_1 = require("breeze-client");
var Configuration_1 = require("./Configuration");
function entityManagerFactory() {
    //NamingConvention.camelCase.setAsDefault();
    breeze_client_1.config.initializeAdapterInstance("uriBuilder", "json");
    var options;
    var em = new breeze_client_1.EntityManager({ serviceName: Configuration_1.configuration.UrlForBreezeBackEndService });
    console.log("Naming Convention:");
    console.log(em.metadataStore.namingConvention);
    return em;
}
exports.entityManagerFactory = entityManagerFactory;
//# sourceMappingURL=EntityManagerFactory.js.map