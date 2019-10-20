
import {
  getUserId,
} from "../utilites";

import moment from 'moment';
import chalk from "chalk";
import PrismaModule from "@prisma-cms/prisma-module";

const tarifs = async (source, args, ctx, info) => {

  return ctx.db.query.tarifs({}, info);
}

const userTarifs = async (source, args, ctx, info) => {

  // console.log("userTarifs", args);

  return ctx.db.query.userTarifs({}, info);
}


const createUserTarif = async (source, args, ctx, info) => {

  let {
    data: {
      Tarif: tarifData,
    },
    promoCode,
  } = args;

  const {
    db,
  } = ctx;


  const userId = await getUserId(ctx);

  // console.log("createUserTarif tarifData", tarifData);

  // Получаем запрошенный тариф
  const {
    id: tarifId,
  } = tarifData.connect || {};

  if (!tarifId) {
    throw (new Error("Tarif ID required"));
  }


  const Tarif = await db.query.tarif({
    where: {
      id: tarifId,
    },
  });

  // console.log("Tarif", Tarif);

  if (!Tarif) {
    throw (new Error("Не был получен тариф"));
  }


  // Проверяем на промокод
  if (promoCode && Tarif.name === "Бизнес" && promoCode.toLowerCase() === "bigcraftday") {

    // return {};
  }
  else {
    throw (new Error("Неверный промокод"));
  }


  // Проверяем нет ли уже ТП у пользователя
  const exists = await db.query.userTarifs({
    first: 1,
    where: {
      User: {
        id: userId,
      },
    },
  });

  if (exists && exists.length) {
    throw (new Error("Уже имеется подключенный тарифный план"));
  }


  let dateTill = moment().add(1, 'y').format();

  // console.log("createUserTarif info", info.fieldNodes[0].arguments);

  // info.fieldNodes[0].arguments = [];

  // Очищаем все аргументы
  info.fieldNodes.map(n => {
    n.arguments = []
  });

  return await ctx.db.mutation.createUserTarif({
    data: {
      Tarif: {
        connect: {
          id: tarifId,
        },
      },
      User: {
        connect: {
          id: userId,
        },
      },
      dateTill,
    },
  }, info);
}


// Заявка на подключение ТП
// const createTarifRequest = async (source, args, ctx, info) => {

//   const userId = await getUserId(ctx);

//   const {
//     data: {
//       Tarif: {
//         connect: {
//           id: tarifId,
//         },
//       },
//     },
//   } = args;


//   // Очищаем все аргументы
//   info.fieldNodes.map(n => {
//     n.arguments = []
//   });


//   return ctx.db.mutation.createTarifRequest({
//     data: {
//       User: {
//         connect: {
//           id: userId,
//         },
//       },
//       Tarif: {
//         connect: {
//           id: tarifId,
//         },
//       },
//     },
//   }, info);
// }


// Заявка на подключение ТП
const createTarifRequest = async (source, args, ctx, info) => {

  const {
    db,
  } = ctx;

  const userId = await getUserId(ctx);

  const {
    data: {
      Tarif: {
        connect: {
          id: tarifId,
        },
      },
    },
  } = args;


  // Очищаем все аргументы
  info.fieldNodes.map(n => {
    n.arguments = []
  });


  return db.mutation.createTarifRequest({
    data: {
      User: {
        connect: {
          id: userId,
        },
      },
      Tarif: {
        connect: {
          id: tarifId,
        },
      },
    },
  }, info)
    .then(r => {

      if (r) {

        const {
          Tarif,
          User,
        } = r;

        if (Tarif) {

          const {
            name: tarifName,
          } = Tarif;


          const {
            fullname,
            username,
            email,
          } = User || {};

          // console.log(chalk.green("createTarifRequest result"), r);

          // Создаем новое сообщение
          db.mutation.createLetter({
            data: {
              email,
              subject: "Запрос на подключение тарифа",
              message: `<h3>${tarifName}</h3>
            <p>
              ФИО: ${fullname}
            </p>
            <p>
              Емейл: ${email}
            </p>
            <p>
              Логин: ${username}
            </p>
            <p>
              Email: ${email}
            </p>
          `,
            },
          })
            .catch(console.error);

        }

      }


      return r;
    });
}

 

export default class TarifModule extends PrismaModule {


  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, { 
      tarifs,
      userTarifs,
    });


    Object.assign(resolvers.Mutation, { 
      createUserTarif,
      createTarifRequest,
    });




    Object.assign(resolvers, { 
    });


    return resolvers;
  }


}

