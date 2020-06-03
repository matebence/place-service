const Eureka = require('eureka-js-client').Eureka;
const strings = require('../../resources/strings');
const eurekaConfig = require("../config/eureka.config");

new Eureka({instance: eurekaConfig.instance, eureka: eurekaConfig.eureka}).start(result => {
    console.log(strings.EUREKA_ERR)
});