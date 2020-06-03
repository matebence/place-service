module.exports = {
    instance: {
        hostName: require('os').hostname(),
        app: "PLACE-SERVICE",
        vipAddress: "place-service",
        instanceId: `${require('os').hostname()}:place-service:5000`,
        ipAddr: require('ip').address(),
        status: "UP",
        port: {
            $: 5000,
            '@enabled': 'true',
        },
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true,
    },
    eureka: {
        host: 'app-blesk-naming-server:b1477e9ba7723b8f47e9727a39a51edf@192.168.99.100',
        port: 8761,
        servicePath: '/eureka/apps/',
    }
};