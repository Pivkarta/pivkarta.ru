
import PrismaModule from "@prisma-cms/prisma-module";

import {
  Payload,
} from '../utilites';

import chalk from "chalk";

import moment from "moment";


import Auth from '@prisma-cms/prisma-auth';

const {
  getUserId,
} = Auth;


import Translit from "translit";

const translit = Translit({});



const prepareBeerData = function (data) {

  let {
    bitter,
  } = data;


  return data;

}




class BeerPayload extends Payload {


  constructor(props) {

    super(props);

    this.objectType = "Beer";

  }

  async create(objectType, args, info) {

    // this.data = await this.mutate(method, source, args, ctx)
    // .catch(error => {
    //   throw(error);
    // });

    console.log(chalk.green("BeerPayload create"), args);


    let {
      name,
      ...other
    } = args.data;

    const {
      db,
    } = this.ctx;

    // console.log("name", name);

    name = name && name.trim() || "";

    let url_name;

    if (!name) {
      // this.errors.push({
      //   key: "name",
      //   message: "Заполните название",
      // });
      this.addFieldError("name", "Заполните название");
    }

    else {

      // let url_name = cyrillicToTranslit({}).transform(name, "_");
      url_name = translit(name);

      url_name = url_name && url_name.toLowerCase() || undefined;

      let data = {
        url_name,
      };

      console.log(chalk.green("createBeer url_name"), url_name);

      /**
       * Получаем пиво с таким же алиасом
       */

      if (url_name) {

        const beers = await db.query.beers({
          where: {
            url_name_starts_with: url_name,
          },
        })
        // .catch(error => {
        //   console.error("Create beer db.query.beers error", error);
        // });

        console.log(chalk.green("beers"), beers);

        // Если пиво найдено, делаем перебор айдишника
        if (beers && beers.length) {

          let new_url_name;

          let i = 1;

          while ((new_url_name = `${url_name}-${i}`) && beers.findIndex(n => n.url_name === new_url_name) !== -1) {

            // console.log("new_url_name", new_url_name);
            i++;
          }

          // console.log("new_url_name 2", new_url_name);

          if (new_url_name) {
            url_name = new_url_name;
          }

        }

        // console.log("Exists beers", beers);

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

    const result = await super.create(objectType, args);

    console.log("CreateBeer result", result);

    return result;

  }

}



const beersConnection = function (parent, args, ctx, info) {

  return ctx.db.query.beersConnection({}, info)
}


const beers = function (parent, args, ctx, info) {

  return ctx.db.query.beers({
    first: 10,
  }, info)
}

const beer = function (parent, args, ctx, info) {

  return ctx.db.query.beer({}, info)
}




const createBeerData = async function (parent, args, ctx, info) {


  const userId = getUserId(ctx);

  const {
    object_data,
  } = args;

  const {
    name,
    text,
    isPublished,
  } = object_data;

  const date = moment();

  const created_on = `${date.format('YYYY-MM-DD')}T${date.format('HH:mm:ss')}`;

  return ctx.db.mutation.createBeer({
    data: {
      name,
      text,
      isPublished,
      created_on,
      created_by: {
        connect: {
          id: userId,
        },
      },
    },
  }, info)
}



async function createBeerProcessor(source, args, ctx, info) {


  return new BeerPayload(ctx).createWithResponse("Beer", args, info);

}


const updateBeerProcessor = async function (parent, args, ctx, info) {


  const userId = getUserId(ctx);

  let {
    id,
    where,
    data: {
      ...updateData
    }
  } = args;

  let success;
  let message = "";
  let errors = []
  let data;

  if (!where && id) {
    where = {
      id,
    };
  }


  updateData = prepareBeerData(updateData);

  // const {
  //   created_by,
  //   created_on,
  //   ...other
  // } = object_data;

  // errors.push({
  //   key: "region",
  //   message: "SDfdsfr hrthrthrth"
  // });

  // message = "Sdfsdgsdg"


  if (!errors.length) {

    const result = await ctx.db.mutation.updateBeer({
      where,
      data: updateData,
    })
      .then(r => r)
      .catch(e => {
        success = false;
        message = e.message;
      });

    data = result;

  }


  // message = "dsfsdf";

  return {
    success: success !== undefined ? success : !errors.length && data ? true : false,
    message,
    errors,
    data,
  };
}


const getBeerPayloadData = function (source, args, ctx, info) {

  const {
    data,
  } = source;

  if (!data) {
    return null;
  }

  const {
    id,
  } = data;


  return ctx.db.query.beer({
    where: {
      id,
    },
  }, info);

}


const container_str = function (source) {

  const {
    container,
  } = source;

  let container_str;


  switch (container) {

    case 1:

      container_str = "Бутылка";
      break;

    case 2:

      container_str = "Банка";
      break;

    case 3:

      container_str = "Пластиковая бутылка";
      break;

    case 4:

      container_str = "Разливное";
      break;

  }

  return container_str;
}


const uri = function (source) {

  const {
    id,
    beer_id,
    url_name,
  } = source;

  // console.log("source", source);


  let uri = `/beer/${beer_id}/`;

  if (url_name) {
    uri += `${url_name}/`;
  }

  return uri;;

}






export default class BeersModule extends PrismaModule {


  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      beersConnection,
      beers,
      beer,
    });


    Object.assign(resolvers.Mutation, {
      updateBeerProcessor,
      createBeerProcessor,
    });




    Object.assign(resolvers, {
      BeerPayload: {
        data: getBeerPayloadData,
      },

      Beer: {
        container_str,
        uri,
      },
    });


    return resolvers;
  }


}

