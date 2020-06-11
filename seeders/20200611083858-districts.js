module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('districts', [{
          "id": 1,
          "name": "Bánovce nad Bebravou",
          "vehRegNum": "BN",
          "code": 301,
          "regionId": 6,
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
          {
              "id": 2,
              "name": "Banská Bystrica",
              "vehRegNum": "BB",
              "code": 601,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 3,
              "name": "Banská Štiavnica",
              "vehRegNum": "BS",
              "code": 602,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 4,
              "name": "Bardejov",
              "vehRegNum": "BJ",
              "code": 701,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 5,
              "name": "Bratislava I",
              "vehRegNum": "BA, BL",
              "code": 101,
              "regionId": 2,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 6,
              "name": "Bratislava II",
              "vehRegNum": "BA, BL",
              "code": 102,
              "regionId": 2,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 7,
              "name": "Bratislava III",
              "vehRegNum": "BA, BL",
              "code": 103,
              "regionId": 2,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 8,
              "name": "Bratislava IV",
              "vehRegNum": "BA, BL",
              "code": 104,
              "regionId": 2,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 9,
              "name": "Bratislava V",
              "vehRegNum": "BA, BL",
              "code": 105,
              "regionId": 2,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 10,
              "name": "Brezno",
              "vehRegNum": "BR",
              "code": 603,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 11,
              "name": "Bytča",
              "vehRegNum": "BY",
              "code": 501,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 12,
              "name": "Čadca",
              "vehRegNum": "CA",
              "code": 502,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 13,
              "name": "Detva",
              "vehRegNum": "DT",
              "code": 604,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 14,
              "name": "Dolný Kubín",
              "vehRegNum": "DK",
              "code": 503,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 15,
              "name": "Dunajská Streda",
              "vehRegNum": "DS",
              "code": 201,
              "regionId": 7,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 16,
              "name": "Galanta",
              "vehRegNum": "GA",
              "code": 202,
              "regionId": 7,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 17,
              "name": "Gelnica",
              "vehRegNum": "GL",
              "code": 801,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 18,
              "name": "Hlohovec",
              "vehRegNum": "HC",
              "code": 203,
              "regionId": 7,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 19,
              "name": "Humenné",
              "vehRegNum": "HE",
              "code": 702,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 20,
              "name": "Ilava",
              "vehRegNum": "IL",
              "code": 302,
              "regionId": 6,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 21,
              "name": "Kežmarok",
              "vehRegNum": "KK",
              "code": 703,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 22,
              "name": "Komárno",
              "vehRegNum": "KN",
              "code": 401,
              "regionId": 4,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 23,
              "name": "Košice I",
              "vehRegNum": "KE",
              "code": 802,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 24,
              "name": "Košice II",
              "vehRegNum": "KE",
              "code": 803,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 25,
              "name": "Košice III",
              "vehRegNum": "KE",
              "code": 804,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 26,
              "name": "Košice IV",
              "vehRegNum": "KE",
              "code": 805,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 27,
              "name": "Košice-okolie",
              "vehRegNum": "KS",
              "code": 806,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 28,
              "name": "Krupina",
              "vehRegNum": "KA",
              "code": 605,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 29,
              "name": "Kysucké Nové Mesto",
              "vehRegNum": "KM",
              "code": 504,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 30,
              "name": "Levice",
              "vehRegNum": "LV",
              "code": 402,
              "regionId": 4,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 31,
              "name": "Levoča",
              "vehRegNum": "LE",
              "code": 704,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 32,
              "name": "Liptovský Mikuláš",
              "vehRegNum": "LM",
              "code": 505,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 33,
              "name": "Lučenec",
              "vehRegNum": "LC",
              "code": 606,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 34,
              "name": "Malacky",
              "vehRegNum": "MA",
              "code": 106,
              "regionId": 2,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 35,
              "name": "Martin",
              "vehRegNum": "MT",
              "code": 506,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 36,
              "name": "Medzilaborce",
              "vehRegNum": "ML",
              "code": 705,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 37,
              "name": "Michalovce",
              "vehRegNum": "MI",
              "code": 807,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 38,
              "name": "Myjava",
              "vehRegNum": "MY",
              "code": 303,
              "regionId": 6,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 39,
              "name": "Námestovo",
              "vehRegNum": "NO",
              "code": 507,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 40,
              "name": "Nitra",
              "vehRegNum": "NR",
              "code": 403,
              "regionId": 4,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 41,
              "name": "Nové Mesto nad Váhom",
              "vehRegNum": "NM",
              "code": 304,
              "regionId": 6,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 42,
              "name": "Nové Zámky",
              "vehRegNum": "NZ",
              "code": 404,
              "regionId": 4,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 43,
              "name": "Partizánske",
              "vehRegNum": "PE",
              "code": 305,
              "regionId": 6,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 44,
              "name": "Pezinok",
              "vehRegNum": "PK",
              "code": 107,
              "regionId": 2,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 45,
              "name": "Piešťany",
              "vehRegNum": "PN",
              "code": 204,
              "regionId": 7,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 46,
              "name": "Poltár",
              "vehRegNum": "PT",
              "code": 607,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 47,
              "name": "Poprad",
              "vehRegNum": "PP",
              "code": 706,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 48,
              "name": "Považská Bystrica",
              "vehRegNum": "PB",
              "code": 306,
              "regionId": 6,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 49,
              "name": "Prešov",
              "vehRegNum": "PO",
              "code": 707,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 50,
              "name": "Prievidza",
              "vehRegNum": "PD",
              "code": 307,
              "regionId": 6,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 51,
              "name": "Púchov",
              "vehRegNum": "PU",
              "code": 308,
              "regionId": 6,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 52,
              "name": "Revúca",
              "vehRegNum": "RA",
              "code": 608,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 53,
              "name": "Rimavská Sobota",
              "vehRegNum": "RS",
              "code": 609,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 54,
              "name": "Rožňava",
              "vehRegNum": "RV",
              "code": 808,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 55,
              "name": "Ružomberok",
              "vehRegNum": "RK",
              "code": 508,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 56,
              "name": "Sabinov",
              "vehRegNum": "SB",
              "code": 708,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 57,
              "name": "Senec",
              "vehRegNum": "SC",
              "code": 108,
              "regionId": 2,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 58,
              "name": "Senica",
              "vehRegNum": "SE",
              "code": 205,
              "regionId": 7,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 59,
              "name": "Skalica",
              "vehRegNum": "SI",
              "code": 206,
              "regionId": 7,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 60,
              "name": "Snina",
              "vehRegNum": "SV",
              "code": 709,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 61,
              "name": "Sobrance",
              "vehRegNum": "SO",
              "code": 809,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 62,
              "name": "Spišská Nová Ves",
              "vehRegNum": "SN",
              "code": 810,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 63,
              "name": "Stará Ľubovňa",
              "vehRegNum": "SL",
              "code": 710,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 64,
              "name": "Stropkov",
              "vehRegNum": "SP",
              "code": 711,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 65,
              "name": "Svidník",
              "vehRegNum": "SK",
              "code": 712,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 66,
              "name": "Šaľa",
              "vehRegNum": "SA",
              "code": 405,
              "regionId": 4,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 67,
              "name": "Topoľčany",
              "vehRegNum": "TO",
              "code": 406,
              "regionId": 4,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 68,
              "name": "Trebišov",
              "vehRegNum": "TV",
              "code": 811,
              "regionId": 3,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 69,
              "name": "Trenčín",
              "vehRegNum": "TN",
              "code": 309,
              "regionId": 6,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 70,
              "name": "Trnava",
              "vehRegNum": "TT",
              "code": 207,
              "regionId": 7,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 71,
              "name": "Turčianske Teplice",
              "vehRegNum": "TR",
              "code": 509,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 72,
              "name": "Tvrdošín",
              "vehRegNum": "TS",
              "code": 510,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 73,
              "name": "Veľký Krtíš",
              "vehRegNum": "VK",
              "code": 610,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 74,
              "name": "Vranov nad Topľou",
              "vehRegNum": "VT",
              "code": 713,
              "regionId": 5,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 75,
              "name": "Zlaté Moravce",
              "vehRegNum": "ZM",
              "code": 407,
              "regionId": 4,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 76,
              "name": "Zvolen",
              "vehRegNum": "ZV",
              "code": 611,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 77,
              "name": "Žarnovica",
              "vehRegNum": "ZC",
              "code": 612,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 78,
              "name": "Žiar nad Hronom",
              "vehRegNum": "ZH",
              "code": 613,
              "regionId": 1,
              "createdAt": new Date(),
              "updatedAt": new Date()
          },
          {
              "id": 79,
              "name": "Žilina",
              "vehRegNum": "ZA",
              "code": 511,
              "regionId": 8,
              "createdAt": new Date(),
              "updatedAt": new Date()
          }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('districts', null, {});
  }
};