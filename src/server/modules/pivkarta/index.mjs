
import fs from "fs";

import chalk from "chalk";

import { CmsModule } from "@prisma-cms/server";




import UsersModule from "./user";
import BeersModule from "./beer";
import PlacesModule from "./place";
import CityModule from "./city";
import CommentModule from "./comment";
import MapModule from "./map";
import TarifModule from "./tarif";
import TopicModule from "./topic";
import LetterModule from "./letter";


import { parse, print } from "graphql";

import MergeSchema from 'merge-graphql-schemas';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
const { fileLoader, mergeTypes } = MergeSchema;


class CoreModule extends CmsModule {

  constructor(options = {}) {

    let {
      modules = [],
    } = options;

    super(options);

    this.mergeModules([
      // RouterModuleExtended,
    ]);

    modules = [
      UsersModule,
      BeersModule,
      PlacesModule,
      CityModule,
      CommentModule,
      MapModule,
      TarifModule,
      TopicModule,
      LetterModule,
    ];

    this.mergeModules(modules);

  }



  getSchema(types = []) {

    let schema = fileLoader(__dirname + '/schema/database/', {
      recursive: true,
    });


    if (schema) {
      types = types.concat(schema);
    }


    let typesArray = super.getSchema(types);

    return typesArray;

  }


  getApiSchema(types = []) {


    let apiSchema = super.getApiSchema(types, [
      "PlaceCreateOneWithoutLettersInput",
      "CommentCreateInput",
      "CommentUpdateInput",
      "BeerCreateInput",
      "BeerUpdateInput",
      "TopicCreateInput",
      "TopicUpdateInput",
      "UserUpdateInput",
      "UserCreateOneWithoutTarifsInput",
      "TarifCreateOneWithoutUserTarifsInput",
      "UserCreateOneInput",
    ]);


    let schema = fileLoader(__dirname + '/schema/api/', {
      recursive: true,
    });

    apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });


    /**
     * Фильтруем все резолверы, коих нет в текущем классе
     */
    const resolvers = this.getResolvers();

    const parsed = parse(apiSchema);

    let operations = parsed.definitions.filter(
      n => n.kind === "ObjectTypeDefinition"
        && ["Query", "Mutation", "Subscription"].indexOf(n.name.value) !== -1
    );

    operations.map(n => {

      let {
        name: {
          value: operationName,
        },
        fields,
      } = n;

      n.fields = fields.filter(field => {
        return resolvers[operationName][field.name.value] ? true : false;
      });

    });

    return apiSchema;

  }



  getResolvers() {


    let resolvers = super.getResolvers();

    const {
      Query: {
        letter,
        letters,
        lettersConnection,
        file,
        files,
        filesConnection,
        logedin,
        logedins,
        logedinsConnection,
        log,
        logs,
        logsConnection,
        ...Query
      },
      Mutation,
      ...other
    } = resolvers;



    let AllowedMutations = {
      ...Mutation,
    };

    // for(var i in AllowedMutations){
    //   AllowedMutations[i] = () => {
    //     throw new Error ("Ведутся технические работы. Ориентировочно закончатся в 10 утра по Москве.");
    //   }
    // }

    // console.log("resolvers other", other);

    return {
      ...other,
      Query: {
        ...Query,
      },
      Mutation: AllowedMutations,
      Log: {
        stack: () => null,
      },
      Letter: {
        id: () => null,
        email: () => null,
        subject: () => null,
        message: () => null,
      },
    };

  }
 


}

 

export default CoreModule;