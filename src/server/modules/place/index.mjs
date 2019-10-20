
import PrismaModule from "@prisma-cms/prisma-module";


import {
  getUserId,
  Payload,
} from "../utilites";

import chalk from 'chalk';


import Translit from "translit";
import TranslitRussian from "translit-russian";

const translit = Translit(TranslitRussian);


class PlacePayload extends Payload {



  constructor(props) {

    super(props);

    this.objectType = "Place";

  }

  async mutate(method, args, info) {

    // const userId = await getUserId(this.ctx);

    const {
      db,
    } = this.ctx;

    let {
      data: {
        best,
        ...data
      },
      ...other
    } = args;


    let {
      Owner,
    } = data;

    const user = await this.getUser(true);

    // console.log(chalk.green("PlacePayload user"), user);

    if (!user) {
      throw (new Error("Необходимо авторизоваться"));
    }
    else {

      const {
        id: userId,
        sudo,
      } = user;


      /**
       * Если указан владелец (каждый пользователь имеет право указать, что это его заведение),
       * то проверяем есть ли у него уже подключенные заведения
       */
      if (Owner !== undefined) {

        // await db.query.placesConnection({
        //   where:{
        //     Owner:{
        //       id: userId,
        //     }
        //   }
        // })
        // .then(r => {

        //   const {
        //     placesConnection: {
        //       aggregate: {
        //         count: ownPlacesCount,
        //       },
        //     },
        //   } = r;

        const query = `
          query (
            $userId: ID!
          ){
            placesConnection(
              where:{
                Owner:{
                  id: $userId
                }
              }
            ){
              aggregate{
                count
              }
            }
          }
        `;

        await db.request(query, {
          userId,
        })
          .then(r => {

            // console.log("placesConnection result", r);

            const {
              aggregate: {
                count: ownPlacesCount,
              },
            } = r && r.data && r.data.placesConnection;

            if (ownPlacesCount > 0) {
              this.addError("У вас уже есть свои заведения. Если вам надо больше заведений, обратитесь к администрации.");
            }

            return r;

          });

      }


      if (sudo === true) {

        data = {
          ...data,
          best,
        };
      }

    }


    args = {
      ...other,
      data,
    }

    // this.addError("Debug");

    return super.mutate(method, args, info);

  }

  async create(method, args, info) {

    // this.data = await this.mutate(method, source, args, ctx)
    // .catch(error => {
    //   throw(error);
    // });


    const {
      name,
      ...other
    } = args.data;

    const {
      db,
    } = this.ctx;

    // console.log("name", name);

    // let url_name = cyrillicToTranslit({}).transform(name, "_");
    let url_name;

    url_name = url_name && url_name.toLowerCase() || undefined;

    let data = {
    };

    // console.log("createBeer data", data);

    if (!name) {
      this.errors.push({
        key: "name",
        message: "Заполните название",
      });
    }
    else {
      url_name = translit(name).replace(/[\/\? ]+/g, '-').replace(/\-+/g, '-');

      url_name = url_name && url_name.toLowerCase() || undefined;

      data.url_name = url_name;

      /**
       * Получаем пиво с таким же алиасом
       */

      if (url_name) {

        const places = await db.query.places({
          where: {
            url_name_starts_with: url_name,
          },
        });


        // Если пиво найдено, делаем перебор айдишника
        if (places && places.length) {

          let new_url_name;

          let i = 1;

          while ((new_url_name = `${url_name}-${i}`) && places.findIndex(n => n.url_name === new_url_name) !== -1) {

            // console.log("new_url_name", new_url_name);
            i++;
          }

          // console.log("new_url_name 2", new_url_name);

          if (new_url_name) {
            url_name = new_url_name;
          }

        }

        // console.log("Exists places", places);

      }
      else {
        this.success = false;
        this.message = "Не удалось сформировать алиас";
      }
    }



    // return {
    //   success: true,
    //   message: url_name,
    //   errors: [],
    //   data,
    // }


    Object.assign(args, {
      data: {
        ...args.data,
        url_name,
      },
    });

    return super.create(method, args);

  }



  async update(objectType, args, info) {

    return super.update(objectType, args);

  }




  async prepareNotificationLetter(method, object) {

    const currentUser = await this.getUser();

    const {
      sudo,
      fullname,
      username,
    } = currentUser || {};

    // console.log("prepareNotificationLetter", method, object);

    if (object && sudo !== true) {

      const {
        name,
        place_id,
      } = object;


      const url = "https://pivkarta.ru" + `/place/${place_id}`;

      return {
        email: "info@pivkarta.ru",
        subject: "Отредактировано заведение",
        message: `<h3>${name}</h3>
          <p>
            <a href="${url}">${name}</a>
          </p>
          <p>
            Пользователь: ${username}
          </p>
        `,
      };

    }

    return null;
  }

}


class PlaceBeerPayload extends Payload {




}



const placesConnection = async function (parent, args, ctx, info) {

  const result = await ctx.db.query.placesConnection({}, info)

  // console.log("placesConnection", result);

  return result;
}



const place = function (parent, args, ctx, info) {

  return ctx.db.query.place({}, info)
}


const places = function (parent, args, ctx, info) {

  return ctx.db.query.places({}, info)
}


const mapPlacesConnection = async function (parent, args, ctx, info) {

  // return ctx.db.query.place({   }, info)

  const {
    // db,
    knex,
  } = ctx;


  const {
    first: limit = 10,
    skip,
    type,
    center,
  } = args;

  // console.log("mapPlacesConnection type", type);

  // console.log("mapPlacesConnection args", args);


  // const ids = ["0019d0719288df354f8eca9b7", "000f138f6233b53bc4f1f063e", "002d6132a0ee8222ca823a1ad"];

  let ids = [];
  let count = 0;



  const {
    fieldNodes: {
      0: {
        selectionSet,
      }
    },
  } = info;

  // const totalSelection = selectionSet && selectionSet.selections.find(n => n.name.value === "count");
  const totalSelection = selectionSet && selectionSet.selections.find(n => n.name.value === "aggregate");

  // console.log("totalSelection", totalSelection);

  var q = knex(`Place`)
    .select('Place.*')
    // .select(knex.raw('if(places.latitude > 0, cast(places.latitude AS DECIMAL(20,17)), null) as latitude')) 
    // .select(knex.raw('if(places.longitude > 0, cast(places.longitude AS DECIMAL(20,17)), null) as longitude')) 
    // .select(knex.raw('unix_timestamp(places.created_at) as createdon')) 
    ;


  // Поиск по типу
  if (type) {
    type.map(n => {

      switch (n) {

        case 'shop':
          q.where("is_shop", 1);
          break;

        case 'bar':
          q.where("is_bar", 1);
          break;

        case 'brewery':
          q.where("is_brewery", 1);
          break;

      }

    });
  }


  if (center) {

    const {
      lat,
      lng,
    } = center;


    if (lat && lng) {

      q.whereNotNull("lat");
      q.whereNotNull("lng");

      q.orderByRaw(`sqrt(pow(abs(${lat} - lat), 2) + pow(abs(${lng} - lng), 2))`);
    }

  }


  /**
   * Исключаем дубли
   */
  q.whereRaw(`(is_request is null OR is_request = 0)`);

  q.where("active", 1);


  if (totalSelection) {

    let q2 = knex.select(knex.raw(`count(*) as total`))
      .from(q.clone().clearSelect().select('Place.*').as('t1'));


    await q2.then(r => {

      count = r && r[0].total || 0;

    });

  }



  if (limit > 0) {
    q.limit(limit);
  }

  if (skip > 0) {
    q.offset(skip);
  }


  // if (center) {

  //   const {
  //     lat,
  //     lng,
  //   } = center;


  //   if (lat && lng) {

  //     q.whereNotNull("lat");
  //     q.whereNotNull("lng");

  //     q.orderByRaw(`sqrt(pow(abs(${lat} - lat), 2) + pow(abs(${lng} - lng), 2))`);
  //   }

  // }



  // console.log(chalk.green("q toSQL"), q.toString());

  // ids = await q
  //   .then(r => {

  //     return r ? r.map(n => n.id) : [];

  //   })
  //   .catch(e => {
  //     throw (e);
  //   });

  let result = await q.then(r => r).catch(console.error);


  const r = {
    count,
    // ids,
    edges: result ? result.map(n => {

      // console.log("result n", n);

      return {
        node: n,
      }
    }) : [],
    // edges: [{
    //   id: "DSFsdf",
    // }]
  }

  // console.log("result", r);

  return r;
}


// const mapPlacesConnection = async function (parent, args, ctx, info) {

//   // return ctx.db.query.place({   }, info)

//   const {
//     // db,
//     knex,
//   } = ctx;


//   const {
//     first: limit = 10,
//     skip,
//     type,
//     center,
//   } = args;

//   console.log("Place type", type);


//   // const ids = ["0019d0719288df354f8eca9b7", "000f138f6233b53bc4f1f063e", "002d6132a0ee8222ca823a1ad"];

//   let ids = [];
//   let count = 0;



//   const {
//     fieldNodes: {
//       0: {
//         selectionSet,
//       }
//     },
//   } = info;

//   // const totalSelection = selectionSet && selectionSet.selections.find(n => n.name.value === "count");
//   const totalSelection = selectionSet && selectionSet.selections.find(n => n.name.value === "aggregate");

//   // console.log("totalSelection", totalSelection);

//   var q = knex(`Place`)
//     .select('Place.*')
//     // .select(knex.raw('if(places.latitude > 0, cast(places.latitude AS DECIMAL(20,17)), null) as latitude')) 
//     // .select(knex.raw('if(places.longitude > 0, cast(places.longitude AS DECIMAL(20,17)), null) as longitude')) 
//     // .select(knex.raw('unix_timestamp(places.created_at) as createdon')) 
//     ;


//   // Поиск по типу
//   if (type) {
//     type.map(n => {

//       switch (n) {

//         case 'shop':
//           q.where("is_shop", 1);
//           break;

//         case 'bar':
//           q.where("is_bar", 1);
//           break;

//         case 'brewery':
//           q.where("is_brewery", 1);
//           break;

//       }

//     });
//   }

//   if (totalSelection) {

//     let q2 = knex.select(knex.raw(`count(*) as total`))
//       .from(q.clone().clearSelect().select('Place.*').as('t1'));


//     await q2.then(r => {

//       count = r && r[0].total || 0;

//     });

//   }


//   if (limit > 0) {
//     q.limit(limit);
//   }

//   if (skip > 0) {
//     q.offset(skip);
//   }


//   if (center) {

//     const {
//       lat,
//       lng,
//     } = center;


//     if (lat && lng) {

//       q.whereNotNull("lat");
//       q.whereNotNull("lng");

//       q.orderByRaw(`sqrt(pow(abs(${lat} - lat), 2) + pow(abs(${lng} - lng), 2))`);
//     }

//   }


//   console.log("q toSQL", q.toString());

//   ids = await q
//     .then(r => {

//       return r ? r.map(n => n.id) : [];

//     })
//     .catch(e => {
//       throw (e);
//     });


//   return {
//     count,
//     ids,
//   }

// }

// Получаем заведения с учетом геоданных
// const mapPlaceConnectionPlaces = async (source, args, ctx, info) => {

//   const {
//     ids,
//   } = source;

//   // console.log("MapPlaces 2", source);

//   if (!ids || !ids.length) {
//     return [];
//   }


//   let resolvers = [];

//   ids.map(id => {
//     resolvers.push(new Promise(async (resolve, reject) => {

//       ctx.db.query.place({
//         where: {
//           id,
//         },
//       }, info)
//         .then(r => {

//           // console.log("Result", r);


//           resolve(r)
//         })
//         .catch(reject);

//       // setTimeout(() => {
//       // }, Math.random() * 3000)

//     }));
//   })

//   return Promise.all(resolvers);
// }





// const updatePlaceData = async function (parent, args, ctx, info) {


//   const userId = getUserId(ctx);

//   const {
//     id,
//     object_data,
//   } = args;

//   const placeQuery = `
//     {
//       id
//       name
//     }
//   `;


//   const {
//     created_by,
//     created_on,
//     ...other
//   } = object_data;


//   return ctx.db.mutation.updatePlace({
//     where: {
//       id,
//     },
//     data: {
//       ...other
//     },
//   }, info)
// }

const updatePlaceData = async function (parent, args, ctx, info) {


  // console.log("updatePlaceData args", args);

  const {
    where,
    object_data,
  } = args;

  const {
    created_by,
    created_on,
    ...other
  } = object_data;


  args = {
    where,
    data: {
      ...other
    }
  };

  const result = await new PlacePayload(ctx).update("Place", args, info);

  return result;

}

const updatePlaceProcessor = async function (parent, args, ctx, info) {

  return new PlacePayload(ctx).updateWithResponse("Place", args, info);
}



const togglePlaceBeer = async (parent, args, ctx, info) => {

  const {
    placeId,
    beerId,
    active,
  } = args;

  // console.log("togglePlaceBeer", args);
  // console.log("togglePlaceBeer info", info);

  const {
    db,
    currentUser,
  } = ctx;

  let placeBeer;


  // const userId = await getUserId(ctx);

  if (!currentUser) {
    throw new Error("Необходимо авторизоваться");
  }

  const {
    id: currentUserId,
    sudo,
  } = currentUser;


  // const userQuery = `
  //   query (
  //     $userId:ID!
  //   ){
  //     user(
  //       where:{
  //         id:$userId
  //       }
  //     ){
  //       id
  //       user_id
  //       sudo
  //       Tarifs{
  //         id
  //         Tarif{
  //           id
  //           name
  //           maxPriceItems
  //         }
  //       }
  //     }
  //   }
  // `;

  // const User = await db.query.user({
  //   where: {
  //     id: userId,
  //   },
  // });

  // console.log("Update place userId", userId);

  // const User = await db.request(userQuery, {
  //   userId,
  // }).then(r => {

  //   return r && r.data && r.data.user || null;
  // });


  // console.log(chalk.green("Update place User"), userId);

  // if (!User) {
  //   throw ("Необходимо авторизоваться");
  // }


  // const {
  //   sudo,
  // } = User;


  const placeQuery = `
    query (
      $placeId:ID!
    ){
      place(
        where:{
          id: $placeId
        }
      ){
        id
        name
        Owner{
          id
        }
      }
    }
  `;

  const Place = await db.request(placeQuery, {
    placeId,
  }).then(r => {

    return r && r.data && r.data.place || null;
  });;

  // console.log("Place", Place);
  // console.log("User", User);

  // Проверяем права на заведение
  if (!sudo) {
    if (!Place.Owner || Place.Owner.id !== currentUserId) {
      throw (new Error("Нельзя редактировать чужое заведение"));
    }
  }

  // throw(new Error("Sdfdsf"));

  if (active) {


    await db.query.placeBeers({
      where: {
        Place: {
          id: placeId,
        },
        Beer: {
          id: beerId,
        },
      },
    })
      .then(r => {

        placeBeer = r[0];

      })
      .catch(e => {
        throw (e);
      });

    if (!placeBeer) {

      // throw(new Error("Sdfdsf"));

      if (!sudo) {
        /**
       * Создаем новую позицию.
       * Прежде чем это сделать, надо проверить права или тарифный план пользователя,
       * определить сколько максимум позиций ему можно создавать
       * и посмотреть сколько уже создано
       */

        // const countQuery = `
        //   query (
        //     $userId:ID!
        //   ){
        //     placeBeersConnection(
        //       first:1
        //       where:{
        //         Place:{
        //           Owner:{
        //             id: $userId
        //           }
        //         }
        //       }
        //     ){
        //       aggregate{
        //         count
        //       }
        //     }
        //   }
        // `;

        // const countResult = await db.request(countQuery, {
        //   userId,
        // }).then(r => {

        //   return r && r.data && r.data.placeBeersConnection || null;
        // });

        // const Tarif = User.Tarifs && User.Tarifs[0] ? User.Tarifs[0].Tarif : null;

        // if (!Tarif) {
        //   throw (new Error("Необходимо подключить тарифный план. Подключается в личном кабинете."));
        // }

        // if (countResult.aggregate.count >= Tarif.maxPriceItems) {
        //   throw (new Error("Достигнут лимит ценовых позиций на вашем тарифном плане."));
        // }
      }


      await db.mutation.createPlaceBeer({
        data: {
          Place: {
            connect: {
              id: placeId,
            },
          },
          Beer: {
            connect: {
              id: beerId,
            },
          },
        },
      })
        .catch(error => {
          throw (error);
        });

    }

  }
  else {

    await db.mutation.deleteManyPlaceBeers({
      where: {
        Place: {
          id: placeId,
        },
        Beer: {
          id: beerId,
        },
      },
    }).catch(e => {
      throw (e);
    });

  }

  // console.log("placeBeer", placeBeer);

  // let result;

  return await db.query.place({
    where: {
      id: placeId,
    },
  }, info);

}

const updatePlaceBeerProcessor = async (source, args, ctx, info) => {


  const result = await new PlaceBeerPayload(ctx).updateWithResponse("PlaceBeer", args)
  // .catch(e => {
  //   console.error(e);
  //   throw(e);
  // });

  // console.log("updatePlaceBeer result", result);

  return result;

}


const createPlaceProcessor = async (source, args, ctx, info) => {


  let {
    data: {
      beers,
      Owner,
      place_id,
      ...data
    },
  } = args;

  const {
    db,
  } = ctx;

  // Получаем текущего пользователя
  const userId = await getUserId(ctx);

  const user = await db.query.user({
    where: {
      id: userId,
    },
  });


  // console.log("createPlace user", user);


  /**
   * При создании, если пользователь судо, то владельца не присваиваем, чтобы было понятно, что заведение никому не принадлежит
   */
  if (user.sudo !== true) {

    data.Owner = {
      connect: {
        id: userId,
      },
    };

  }



  // return null;

  const result = await new PlacePayload(ctx).createWithResponse("Place", {
    data: {
      ...data,
      // Owner: {
      //   connect: {
      //     id: userId,
      //   },
      // },
    },
  }, info)
  // .catch(e => {
  //   console.error(e);
  //   throw(e);
  // });

  // console.log("updatePlaceBeer result", result);

  return result;

}


const uri = function (source) {

  const {
    id,
    place_id,
    url_name,
  } = source;

  // console.log("source", source);


  let uri = `/place/${place_id}/`;

  if (url_name) {
    uri += `${url_name}/`;
  }

  return uri;;

}



const getPlacePayloadData = function (source, args, ctx, info) {

  const {
    data,
  } = source;

  if (!data) {
    return null;
  }

  const {
    id,
  } = data;


  return ctx.db.query.place({
    where: {
      id,
    },
  }, info);

}


/**
 * Если имеется емейл, проверяем, есть ли право его видеть
 */
// const email = async function (source, args, ctx, info) {

//   let {
//     email,
//   } = source || {};

//   if (email) {

//     const userId = await getUserId(ctx).catch(console.error);

//     const user = userId ? await ctx.db.query.user({
//       where: {
//         id: userId,
//       },
//     }) : null;

//     if (!user || user.sudo !== true) {
//       email = null;
//     }

//   }

//   return email;
// }


const Place = {
  image: (source) => {

    if (!source) {
      return null;
    }

    let {
      image,
      is_bar,
      is_shop,
      is_brewery,
    } = source;


    if (!image) {

      if (is_bar) {
        image = 'default/bar.jpg';
      }
      else if (is_shop) {
        image = 'default/shop.jpg';
      }
      else if (is_brewery) {
        image = 'default/brewery.jpg';
      }
      else {
        image = 'default/bar.jpg';
      }
    }

    return image;

  },
  email: (source, args, ctx) => {

    const {
      currentUser,
    } = ctx;

    const {
      sudo,
    } = currentUser || {};

    let {
      email,
    } = source || {};

    return sudo ? email : null;

  },
  Letters: () => [],
  uri,
}

/**
 * ToDo replace  with updatePlaceProcessor
 */


export default class PlacesModule extends PrismaModule {


  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      placesConnection,
      mapPlacesConnection,
      places,
      place,
    });


    Object.assign(resolvers.Mutation, {
      createPlaceProcessor,
      updatePlaceData,
      updatePlaceProcessor,
      togglePlaceBeer,
      updatePlaceBeerProcessor,
    });




    Object.assign(resolvers, {
      // MapPlaces,
      MapPlaceConnection: {
        // places: mapPlaceConnectionPlaces,
        aggregate: (source) => {

          if (!source) {
            return null;
          }

          const {
            count,
          } = source;

          // console.log("aggregate source", source);

          return {
            count,
          };
        }
      },
      Place,
      PlacePayload: {
        data: getPlacePayloadData,
      },
      PlaceBeerPayload: {
        data: (source, args, ctx, info) => {

          const {
            id,
          } = source.data || {}

          return id ? ctx.db.query.placeBeer({
            where: {
              id,
            },
          }, info) : null;

        },
      },
    });


    return resolvers;
  }


}


