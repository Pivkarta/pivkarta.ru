
import startServer from "@prisma-cms/server";
import CoreModule from "./modules";

import Knex from "knex";

import imagesMiddleware from "./middleware/ImageThumb";
import Web3 from "web3";

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

const GethServer = process.env.GethServer || "http://localhost:8545";

if(!GethServer){
  throw("Env GethServer required");
}

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(GethServer));

startServer({
  typeDefs: 'src/schema/generated/api.graphql',
  resolvers,
  imagesMiddleware,
  contextOptions: {
    knex,
    web3,
  },
});
 