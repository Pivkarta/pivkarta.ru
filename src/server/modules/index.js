
import fs from "fs";

import chalk from "chalk";

// import PrismaModule from "@prisma-cms/prisma-module";
import { CmsModule } from "@prisma-cms/server";


import { fileLoader, mergeTypes } from 'merge-graphql-schemas';


import UsersModule from "./user";
import BeersModule from "./beer";
import PlacesModule from "./place";
import CityModule from "./city";
import CommentModule from "./comment";
import MapModule from "./map";
import TarifModule from "./tarif";
import TopicModule from "./topic";


class CoreModule extends CmsModule {

  constructor(options = {}) {

    let {
      modules = [],
    } = options;

    super(options);

    modules = [
      UsersModule,
      BeersModule,
      PlacesModule,
      CityModule,
      CommentModule,
      MapModule,
      TarifModule,
      TopicModule,
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


    let apiSchema = super.getApiSchema(types, []);


    let schema = fileLoader(__dirname + '/schema/api/', {
      recursive: true,
    });

    apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });

    return apiSchema;

  }


  getExcludableApiTypes(){

    return super.getExcludableApiTypes([
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

  }

  // getApiSchema(types = []) {


  //   let baseSchema = fs.readFileSync("src/schema/generated/prisma.graphql", "utf-8");

    
  //   // console.log("baseSchema", baseSchema);



  //   // let apiSchema = super.getApiSchema(types.concat(baseSchema), ["UserCreateInput"]);
  //   let apiSchema = super.getApiSchema(types.concat(baseSchema), [
  //     "PlaceCreateOneWithoutLettersInput",
  //     "CommentCreateInput",
  //     "CommentUpdateInput",
  //     "BeerCreateInput",
  //     "BeerUpdateInput",
  //     "TopicCreateInput",
  //     "TopicUpdateInput",
  //     "UserUpdateInput",
  //     "UserCreateOneWithoutTarifsInput",
  //     "TarifCreateOneWithoutUserTarifsInput",
  //     "UserCreateOneInput",
  //     // "",
  //     // "",
  //   ]);

  //   // console.log("apiSchema", apiSchema);
    
  //   // if (schema) {
  //   //   types = types.concat(schema);
  //   // }

  //   let schema = fileLoader(__dirname + '/schema/api/', {
  //     recursive: true,
  //   });

  //   // console.log("schema", schema);

  //   apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });

  //   // console.log("apiSchema", apiSchema);

  //   return apiSchema;

  // }


}



// class CoreResolvers extends PrismaModule {



//   getResolvers() {

//     let resolvers = super.getResolvers();

//     console.log(chalk.green("BaseResolvers resolvers"), resolvers);

//     return resolvers;
//   }


//   getSchema() {


//     let type = `
//       type User {
//         id: ID! @unique
//         extended: String
//       }
//     `

//     let type2 = `
//       type User {
//         extended2: String
//       }
//     `

//     let type3 = `
//       type User {
//         extended3: String
//         sdfffewf: String
//       }

//       type Resource {
//         id: ID! @unique
//         price: Float
//       }
//     `

//     // const schema = require("../schema");

//     let typesArray = super.getSchema([type, type2, type3]);

//     return typesArray;

//   }


//   getApiSchema(types = []) {


//     let schema = fs.readFileSync("src/schema/generated/prisma.graphql", "utf-8");

//     console.log(chalk.green("schema"), schema);

//     schema && types.push(schema);

//     let type = `
//       type User {
//         extended4: String
//       }

//     `
//     types.push(type)

//     return super.getApiSchema(types);

//   }

// }

// const core = new CoreResolvers({
//   modules: [UserModul],
// });

export default CoreModule;