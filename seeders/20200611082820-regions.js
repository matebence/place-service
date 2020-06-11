module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('regions', [
            {
                "id": 1,
                "name": "Banskobystrický kraj",
                "shortcut": "BC",
                createdAt : new Date(),
                updatedAt : new Date(),
            },
            {
                "id": 2,
                "name": "Bratislavský kraj",
                "shortcut": "BL",
                createdAt : new Date(),
                updatedAt : new Date(),
            },
            {
                "id": 3,
                "name": "Košický kraj",
                "shortcut": "KI",
                createdAt : new Date(),
                updatedAt : new Date(),
            },
            {
                "id": 4,
                "name": "Nitriansky kraj",
                "shortcut": "NI",
                createdAt : new Date(),
                updatedAt : new Date(),
            },
            {
                "id": 5,
                "name": "Prešovský kraj",
                "shortcut": "PV",
                createdAt : new Date(),
                updatedAt : new Date(),
            },
            {
                "id": 6,
                "name": "Trenčiansky kraj",
                "shortcut": "TC",
                createdAt : new Date(),
                updatedAt : new Date(),
            },
            {
                "id": 7,
                "name": "Trnavský kraj",
                "shortcut": "TA",
                createdAt : new Date(),
                updatedAt : new Date(),
            },
            {
                "id": 8,
                "name": "Žilinský kraj",
                "shortcut": "ZI",
                createdAt : new Date(),
                updatedAt : new Date(),
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('regions', null, {});
    }
};