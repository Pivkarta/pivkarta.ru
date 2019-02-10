
import fs from "fs";

import chalk from "chalk";

import { CmsModule } from "@prisma-cms/server";



import LogModule from "@prisma-cms/log-module";
// import UserModule from "@prisma-cms/user-module";
import MailModule from "@prisma-cms/mail-module";
import UploadModule from "@prisma-cms/upload-module";
import RouterModule from "@prisma-cms/router-module";
import EthereumModule from "@prisma-cms/ethereum-module";
import SocietyModule from "@prisma-cms/society-module";
import WebrtcModule from "@prisma-cms/webrtc-module";

import UserModule from "./user";
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
      // UserModule,
      LogModule,
      MailModule,
      UploadModule,
      RouterModule,
      EthereumModule,
      SocietyModule,
      WebrtcModule,

      UserModule,
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


  getApiSchema___(types = []) {


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
      "UserCreateInput",
      "UserSubscriptionPayload",
      "TarifCreateOneInput",
      "PlaceCreateOneWithoutBeersInput",
      "BeerCreateOneWithoutPlacesInput",
      "PlaceCreateInput",
      "PlaceUpdateInput",
      "PlaceBeerUpdateInput",
      "PlaceUpdateOneWithoutBeersInput",
      "BeerUpdateOneWithoutPlacesInput",
      "UserUpdateOneWithoutPlacesInput",
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

    // console.log("operations", operations);

    apiSchema = print(parsed);

    return apiSchema;

  }




  getApiSchema(types = []) {

    let baseSchema = [];

    let schemaFile = __dirname + "/../../schema/generated/prisma.graphql";

    if (fs.existsSync(schemaFile)) {
      baseSchema = fs.readFileSync(schemaFile, "utf-8");

      baseSchema = this.cleanupApiSchema(baseSchema, [

        "ResourceCreateInput",
        "ResourceUpdateInput",
        "UserCreateOneWithoutResourcesInput",
        "ResourceCreateOneWithoutChildsInput",
        "ResourceCreateManyWithoutParentInput",
        "UserUpdateOneWithoutResourcesInput",
        "ResourceUpdateOneWithoutChildsInput",
        "ResourceUpdateManyWithoutParentInput",
        "ResourceUpdateManyWithoutCreatedByInput",
        "ResourceCreateManyWithoutCreatedByInput",
        "FileCreateOneWithoutImageResourceInput",
        "FileUpdateOneWithoutImageResourceInput",

        "ChatRoomCreateInput",
        "ChatRoomUpdateInput",
        "UserCreateManyWithoutRoomsInput",
        "UserUpdateManyWithoutRoomsInput",
        // "ChatRoomInvitationUpdateManyWithoutRoomInput",

        "ChatMessageCreateInput",
        "ChatMessageUpdateInput",
        "ChatRoomCreateOneWithoutMessagesInput",

        "ChatMessageReadedCreateInput",
        "ChatMessageCreateOneWithoutReadedByInput",

        // "CallRequestCreateInput",
        "CallRequestUpdateDataInput",
        "ChatRoomCreateOneWithoutCallRequestsInput",
        "ChatRoomUpdateOneWithoutCallRequestsInput",

        "EthContractSourceCreateInput",
        "EthContractSourceUpdateInput",
        "EthTransactionCreateInput",
        // "EthTransactionSubscriptionPayload",
      ]);

    }
    else {
      console.error(chalk.red(`Schema file ${schemaFile} did not loaded`));
    }


    let apiSchema = super.getApiSchema(types.concat(baseSchema), [

      "UserCreateInput",
      "UserUpdateInput",
      // "NotificationTypeUpdateManyWithoutUsersInput",
      // "UserCreateOneWithoutResourcesInput",

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
      "UserCreateInput",
      "UserSubscriptionPayload",
      "TarifCreateOneInput",
      "PlaceCreateOneWithoutBeersInput",
      "BeerCreateOneWithoutPlacesInput",
      "PlaceCreateInput",
      "PlaceUpdateInput",
      "PlaceBeerUpdateInput",
      "PlaceUpdateOneWithoutBeersInput",
      "BeerUpdateOneWithoutPlacesInput",
      "UserUpdateOneWithoutPlacesInput",
    ]);


    let schema = fileLoader(__dirname + '/schema/api/', {
      recursive: true,
    });

    apiSchema = mergeTypes(schema.concat(apiSchema), { all: true });

    // console.log(chalk.green("Modxclub apiSchema"), apiSchema);


    /**
     * Фильтруем все резолверы, коих нет в текущем классе
     */
    const resolvers = this.getResolvers();

    const parsed = parse(apiSchema);

    let operations = parsed.definitions.filter(
      n => n.kind === "ObjectTypeDefinition"
        && ["Query", "Mutation", "Subscription"].indexOf(n.name.value) !== -1
      // && !resolvers[n.name.value][]
    );

    operations.map(n => {

      let {
        name: {
          value: operationName,
        },
        fields,
      } = n;

      n.fields = fields.filter(field => {
        // console.log(chalk.green("field"), field);
        return resolvers[operationName][field.name.value] ? true : false;
      });

    });

    apiSchema = print(parsed);


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
      Mutation: {
        signin,
        signup,
        updateUserProcessor,
        // createBlogProcessor,
        // createTopicProcessor,
        // updateTopicProcessor,
        singleUpload,
        multipleUpload,
        // startImportProcessor,
        resetPassword,
        // createProjectProcessor,

        createTopicProcessor,
        updateTopicProcessor,
        updatePlaceData,
        updatePlaceProcessor,
        updateBeerProcessor,
        createBeerProcessor,
        togglePlaceBeer,
        updatePlaceBeerProcessor,
        createPlaceProcessor,
        createUserTarif,
        createTarifRequest,
        // createLetter,
        // updateLetter,
        createCommentProcessor,
        updateCommentProcessor,

      },
      ...other
    } = resolvers;



    let AllowedMutations = {
      signin,
      signup,
      updateUserProcessor,
      singleUpload,
      multipleUpload,
      resetPassword,

      createTopicProcessor,
      updateTopicProcessor,
      updatePlaceData,
      updatePlaceProcessor,
      updateBeerProcessor,
      createBeerProcessor,
      togglePlaceBeer,
      updatePlaceBeerProcessor,
      createPlaceProcessor,
      createUserTarif,
      createTarifRequest,
      // createLetter,
      // updateLetter,
      createCommentProcessor,
      updateCommentProcessor,
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