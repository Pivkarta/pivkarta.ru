
import {
  Payload,
} from '../utilites';

import PrismaModule from "@prisma-cms/prisma-module";


import Translit from "translit";
import TranslitRussian from "translit-russian";

const translit = Translit(TranslitRussian);

 

class TopicPayload extends Payload {

  constructor(props) {

    super(props);

    this.objectType = "Topic";

  }


  async create(method, args, info) {


    // console.log(chalk.green("Create topic args"), args);

    const {
      db,
    } = this.ctx;

    const currentUser = await this.getUser(true);

    if (!currentUser) {
      throw (new Error("Необходимо авторизоваться"));
    }


    // return;

    // this.addFieldError("name", "dsfgsgddsg");
    // this.addFieldError("editor_content", "editor_contentdsf sdfd");


    const {
      id: currentUserId,
      sudo,
    } = currentUser;


    // console.log(chalk.green("Create topic currentUser"), currentUser);

    let {
      data,
    } = args;

    // const user = await ctx.db.query.user({ where: { username } })
    // if (!user) {
    //   throw new Error(`No such user found for username: ${username}`)
    // }

    const {
      name,
      editor_content,
      published,
      description,
    } = data;


    let url_name;


    // const date = moment();

    // const created_at = `${date.format('YYYY-MM-DD')}T${date.format('HH:mm:ss')}`;
    const created_at = new Date();


    if (!name) {

      this.addFieldError("name", "Заполните название");

      return;
    }
    else {
      url_name = translit(name).replace(/[\/\? ]+/g, '-').replace(/\-+/g, '-');

      url_name = url_name && url_name.toLowerCase() || undefined;

      // console.log(chalk.green("Create topic translit"), translit);
      // console.log(chalk.green("Create topic url_name"), url_name);

      /**
       * Получаем пиво с таким же алиасом
       */

      if (url_name) {

        const objects = await db.query.topics({
          where: {
            url_name_starts_with: url_name,
          },
        });


        // Если пиво найдено, делаем перебор айдишника
        if (objects && objects.length) {

          let new_url_name;

          let i = 1;

          while ((new_url_name = `${url_name}-${i}`) && objects.findIndex(n => n.url_name === new_url_name) !== -1) {

            // console.log("new_url_name", new_url_name);
            i++;
          }

          // console.log("new_url_name 2", new_url_name);

          if (new_url_name) {
            url_name = new_url_name;
          }

        }

      }
      else {
        this.addFieldError("name", "Не удалось сформировать алиас");
        return;
      }
    }


    return super.create(method, {
      data: {
        name,
        editor_content,
        published,
        created_at,
        type_id: 1,
        url_name,
        created_by: {
          connect: {
            id: currentUserId,
          },
        },
        description,
      },
    });

  }

  async update(method, args, info) {

    const {
      db,
    } = this.ctx;

    const currentUser = await this.getUser(true);

    if (!currentUser) {
      throw (new Error("Необходимо авторизоваться"));
    }


    // this.addFieldError("name", "dsfgsgddsg");
    // this.addFieldError("editor_content", "editor_contentdsf sdfd");


    const {
      id: currentUserId,
      sudo,
    } = currentUser;


    let {
      id,
      where = {},
      data,
    } = args;


    if (id) {
      where.id = id;
    }


    // const topic = await ctx.db.query.topic({ where: { id } }, topicQuery)

    // let condition = {
    //   id,
    //   created_by: {
    //     id: userId
    //   }
    // };

    // if (sudo !== true) {
    //   Object.assign(where, {
    //     created_by: {
    //       id: currentUserId,
    //     }
    //   });
    // }

    const exists = await db.exists.Topic({
      ...where,
      created_by: sudo === true ? undefined : {
        id: currentUserId,
      },
    })
    // const exists = (await db.query.topics({where}))[0]

    // console.log('topic', topic);
    // return ;

    if (!exists) {
      throw new Error(`Не был получен топик`);
    }

    // return {
    //   data: {
    //     created_by: {}
    //   },
    // }

    const {
      name,
      editor_content,
      published,
      description,
    } = data;

    // const date = moment();

    // const created_at = `${date.format('YYYY-MM-DD')}T${date.format('HH:mm:ss')}`;

    // return ctx.db.mutation.updateTopic(, info)

    const result = await super.update(method, {
      where,
      data: {
        name,
        editor_content,
        published,
        description,
      },
    });


    return result;

  }


  async mutate(method, args, info) {

    const currentUser = await this.getUser();

    if (!currentUser) {
      throw (new Error("Необходимо авторизоваться"));
    }

    // console.log("currentUser", currentUser);

    const {
      db,
    } = this.ctx;

    const {
      sudo,
    } = currentUser;

    let {
      data,
      ...otherArgs
    } = args;


    let {
      name,
      editor_content,
      published,
      created_at,
      type_id,
      url_name,
      created_by,
    } = data;


    if (name !== undefined && !name) {

      this.addFieldError("name", "Заполните название");

      return;
    }


    if (sudo !== true) {

      data = {
        name,
        editor_content,
        // published,
        created_at,
        type_id,
        url_name,
        created_by,
      };

    }


    const result = await super.mutate(method, {
      ...otherArgs,
      data,
    }, info);


    return result;

  }


  async prepareNotificationLetter(method, object) {

    const currentUser = await this.getUser();

    const {
      sudo,
      fullname,
      username,
    } = currentUser || {};

    // console.log("prepareNotificationLetter", method, object);

    if (object && sudo !== true) {

      const {
        name,
        topic_id,
        url_name,
      } = object;


      const url = "https://pivkarta.ru" + (url_name ? `/topics/${url_name}` : `/blog/show/${topic_id}/`);

      return {
        email: "info@pivkarta.ru",
        subject: "Отредактирован топик",
        message: `<h3>${name}</h3>
          <p>
            <a href="${url}">${name}</a>
          </p>
          <p>
            Пользователь: ${username}
          </p>
        `,
      };

    }

    return null;
  }

}


const topicsConnection = function (parent, args, ctx, info) {

  return ctx.db.query.topicsConnection({}, info)
}

const topic = function (parent, args, ctx, info) {

  return ctx.db.query.topic({}, info)
}




const createTopicProcessor = async function (parent, args, ctx, info) {

  return new TopicPayload(ctx).createWithResponse("Topic", args, info);

}


const updateTopicProcessor = async function (parent, args, ctx, info) {


  return new TopicPayload(ctx).updateWithResponse("Topic", args, info);

}


// const updateTopicData__ = async function (parent, args, ctx, info) {

//   // console.log("updateTopicData", args);

//   const userId = await getUserId(ctx);

//   if (!userId) {
//     throw (new Error("Необходимо авторизоваться"));
//   }

//   const {
//     id,
//     object_data,
//   } = args;

//   const topicQuery = `
//     {
//       id
//       name
//     }
//   `;

//   // const topic = await ctx.db.query.topic({ where: { id } }, topicQuery)

//   let condition = {
//     id,
//     created_by: {
//       id: userId
//     }
//   };

//   const exists = await ctx.db.exists.Topic(condition)

//   // console.log('topic', topic);
//   // return ;

//   if (!exists) {
//     throw new Error(`Не был получен топик`);
//   }

//   // return {
//   //   data: {
//   //     created_by: {}
//   //   },
//   // }

//   const {
//     created_by,
//     created_at,
//     ...other
//   } = object_data;

//   // const date = moment();

//   // const created_at = `${date.format('YYYY-MM-DD')}T${date.format('HH:mm:ss')}`;

//   return ctx.db.mutation.updateTopic({
//     where: {
//       id,
//     },
//     data: {
//       ...other
//     },
//   }, info)
// }



const Topic = {

  uri: (source) => {

    const {
      topic_id: topicId,
      url_name,
    } = source

    return url_name ? `/topics/${url_name}/` : `/blog/show/${topicId}/`;
  },
}




export default class TopicModule extends PrismaModule {


  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      topicsConnection,
      topic,
    });


    Object.assign(resolvers.Mutation, {
      createTopicProcessor,
      updateTopicProcessor,
    });




    Object.assign(resolvers, {
      TopicResponse: {
        data: (source, args, ctx, info) => {

          const {
            id,
          } = source.data || {};

          return id ? ctx.db.query.topic({
            where: {
              id,
            },
          }, info) : null;

        },
      },
      Topic,
    });


    return resolvers;
  }


}

