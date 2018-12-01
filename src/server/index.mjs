
import startServer from "@prisma-cms/server";
import CoreModule from "./modules";

import Knex from "knex";

import imagesMiddleware from "./middleware/ImageThumb";

const coreModule = new CoreModule({
});

const resolvers = coreModule.getResolvers();


// console.log("resolvers", resolvers);

const knex = Knex({
  client: 'mysql',
  connection: {
    host: 'mysql.prisma-1.14',
    user: 'root',
    database: 'pivkarta@dev',
    password: 'prisma',
  },
});


startServer({
  typeDefs: 'src/schema/generated/api.graphql',
  resolvers,
  imagesMiddleware,
  contextOptions: {
    knex,
  },
});
 