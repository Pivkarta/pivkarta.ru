
import startServer from "@prisma-cms/server";

import CoreModule from "./modules"; 

import imagesMiddleware from "./middleware/ImageThumb";

const coreModule = new CoreModule({
});

const resolvers = coreModule.getResolvers();

// const imagesMiddleware = new ImagesMiddleware().processRequest;


startServer({
  typeDefs: 'src/schema/generated/api.graphql',
  resolvers,
  imagesMiddleware,

  knexOptions: {
    connection: {
      host: 'mysql.prisma-1.14',
      user: 'root',
      database: 'pivkarta@dev',
      password: 'prisma',
    },
  },
});
 