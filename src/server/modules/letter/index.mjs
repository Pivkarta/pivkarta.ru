
// import Payload from "../../modules/Payload";

import Payload from '@prisma-cms/prisma-processor';
import PrismaModule from '@prisma-cms/prisma-module';
// import Payload from '../../modules/prisma-processor';



class LetterPayload extends Payload {



  constructor(props) {

    super(props);

    this.objectType = "Letter";

  }

  async mutate(objectType, args, info) {

    const {
      currentUser,
    } = ctx;

    const {
      sudo,
    } = currentUser || {}

    if (!sudo) {
      throw (new Error("Access denied"));
    }


    let {
      data: {
        Place,
        ...data
      },
      ...other
    } = args;


    if (Place !== undefined) {

      if (Place && Place.id) {
        Place = {
          connect: {
            id: Place.id,
          },
        }
      }
      else {
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

    // console.log("Create lette new args", args);

    return super.mutate(objectType, args);
  }


  letter(args, info) {

    const {
      db,
      currentUser,
    } = this.ctx;

    const {
      sudo,
    } = currentUser || {}

    if (!sudo) {
      throw (new Error("Access denied"));
    }

    return db.query.letter(args, info);
  }


  letters(args, info) {

    const {
      db,
      currentUser,
    } = this.ctx;


    const {
      sudo,
    } = currentUser || {}

    if (!sudo) {
      throw (new Error("Access denied"));
    }


    return db.query.letters(args, info);
  }


  lettersConnection(args, info) {

    const {
      db,
      currentUser,
    } = this.ctx;


    const {
      sudo,
    } = currentUser || {}

    if (!sudo) {
      throw (new Error("Access denied"));
    }


    return db.query.lettersConnection(args, info);
  }

}


const letter = (source, args, ctx, info) => {

  return new LetterPayload(ctx).letter(args, info);
}

const letters = (source, args, ctx, info) => {

  return new LetterPayload(ctx).letters(args, info);
}

const lettersConnection = (source, args, ctx, info) => {

  return new LetterPayload(ctx).lettersConnection(args, info);
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

