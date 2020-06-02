const Eureka = require('eureka-js-client').Eureka;
const eurekaConfig = require("../config/eureka.config");

const client = new Eureka({instance: eurekaConfig.instance, eureka: eurekaConfig.eureka});
client.logger.level('debug');
client.start(error => {});