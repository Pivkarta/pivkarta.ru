

import UserModule, {
  UserPayload,
} from "@prisma-cms/user-module";

import MergeSchema from 'merge-graphql-schemas';

import path from 'path';

const moduleURL = new URL(import.meta.url);

const __dirname = path.dirname(moduleURL.pathname);

const { fileLoader, mergeTypes } = MergeSchema;


export class PivkartaUserProcessor extends UserPayload{

  
  async signup(source, args, ctx, info){

    let {
      data: {
        username,
        email,
        password,
      },
    } = args;


    if(!username){
      this.addFieldError("username", "Не указан логин");
    }

    if(!email){
      this.addFieldError("email", "Не указан емейл");
    }

    if(!password){
      this.addFieldError("password", "Не указан пароль");
    }


    return super.signup(args, info);
  }

}


class PivkartaUserModule extends UserModule {


  getResolvers() {


    let resolvers = super.getResolvers();

    const {
      Mutation: {
        signup,
        ...Mutation
      },
      ...other
    } = resolvers;

 

    return {
      ...other,
      Mutation: {
        ...Mutation,
        signup: (source, args, ctx, info) => {

          return new PivkartaUserProcessor(ctx).signup(source, args, ctx, info);
        },
      },
      Subscription: {
        user: {
          subscribe: async (parent, args, ctx, info) => {
  
            return ctx.db.subscription.user({}, info);
          },
        },
      },
    };

  }

}


export default PivkartaUserModule;