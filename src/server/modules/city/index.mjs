import PrismaModule from "@prisma-cms/prisma-module";
import chalk from "chalk";

let citiesCache;

const cities = async (source, args, ctx, info) => {

  // console.log(chalk.green("cities args"), args);


  // let {
  //   orderBy,
  //   where,
  // } = args;

  // if(orderBy || where){
  //   return await ctx.db.query.cities(args, info);
  // }


  // if (!citiesCache) {

  //   citiesCache = await ctx.db.query.cities({}, info);
  // }

  // return citiesCache;

  return await ctx.db.query.cities(args, info);

}

const city = async (source, args, ctx, info) => {

  return ctx.db.query.city(args, info);
}


const createCity = async (source, args, ctx, info) => {

  const {
    currentUser,
  } = ctx;

  const {
    sudo,
  } = currentUser || {};

  if(!sudo) {
    throw new Error("Access denied");
  }

  return ctx.db.mutation.createCity(args, info);
}


const updateCity = async (source, args, ctx, info) => {

  const {
    currentUser,
  } = ctx;

  const {
    sudo,
  } = currentUser || {};

  if(!sudo) {
    throw new Error("Access denied");
  }

  return ctx.db.mutation.updateCity(args, info);
}




export default class CityModule extends PrismaModule {


  constructor(props) {

    super(props);

    this.objectType = "City";

  }

  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      cities,
      city,
    });


    Object.assign(resolvers.Mutation, {
      createCity,
      updateCity,
    });




    Object.assign(resolvers, {
    });


    return resolvers;
  }


}
