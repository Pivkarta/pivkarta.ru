
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

    return apiSchema;

  }
 


}

 

export default CoreModule;