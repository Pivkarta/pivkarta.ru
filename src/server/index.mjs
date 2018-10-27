 



import startServer from "@prisma-cms/server";
 

import CoreModule from "./modules"; 

const coreModule = new CoreModule({
});

const resolvers = coreModule.getResolvers();


import imagesMiddleware from "./middleware/ImageThumb";


switch (process.env.action) {

  case "start-server":
 

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

    break;

}


