
// import Payload from "../../modules/Payload";

import Payload from '@prisma-cms/prisma-processor';
import PrismaModule from '@prisma-cms/prisma-module';
// import Payload from '../../modules/prisma-processor';



class LetterPayload extends Payload {

  objectType = "Letter";

  async mutate(objectType, args, info) {

    const user = await this.getUser();

    if(!user || user.sudo !== true){
      throw(new Error("Access denied"));
    }

    let {
      data: {
        Place,
        ...data
      },
      ...other
    } = args;


    if(Place !== undefined){

      if(Place && Place.id){
        Place = {
          connect: {
            id: Place.id,
          },
        }
      }
      else{
        Place = undefined;
      }

    }


    args = {
      ...other,
      data: {
        ...data,
        Place,
      }
    }

    console.log("Create lette new args", args);

    return super.mutate(objectType, args);
  }


  letter = async (args, info) => {

    const {
      db,
    } = this.ctx;

    const user = await this.getUser();

    if (!user) {
      throw (new Error("Access denied"));
    }

    return db.query.letter({}, info);
  }


  letters = async (args, info) => {

    const {
      db,
    } = this.ctx;

    const user = await this.getUser();

    if (!user) {
      throw (new Error("Access denied"));
    }

    return db.query.letters({}, info);
  }


  lettersConnection = async (args, info) => {

    const {
      db,
    } = this.ctx;

    const user = await this.getUser();

    if (!user) {
      throw (new Error("Access denied"));
    }

    return db.query.lettersConnection({}, info);
  }

}


const letter = (source, args, ctx, info) => {

  return new LetterPayload(ctx).letter({}, info);
}

const letters = (source, args, ctx, info) => {

  return new LetterPayload(ctx).letters({}, info);
}

const lettersConnection = (source, args, ctx, info) => {

  return new LetterPayload(ctx).lettersConnection({}, info);
}


const createLetter = (source, args, ctx, info) => {

  return new LetterPayload(ctx).create("Letter", args, info);
}

 


export default class CityModule extends PrismaModule {


  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, { 
      letter,
      letters,
      lettersConnection,
    });


    Object.assign(resolvers.Mutation, { 
      createLetter,
    });




    Object.assign(resolvers, { 
    });


    return resolvers;
  }


}

