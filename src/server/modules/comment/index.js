
import Payload from "@prisma-cms/prisma-processor";

import chalk from "chalk";
import PrismaModule from "@prisma-cms/prisma-module";


class CommentsPayload extends Payload {

  objectTypes = "Comment"



  /**
   * ToDo:
   * Добавить проверку object_id
   */

  async create(objectType, args, info) {


    console.log(chalk.green("CreateComment args"), args);

    let {
      data: {
        parent,
        type_id,
        object_id,
        editor_content,
        ...data
      },
    } = args;


    const {
      db,
    } = this.ctx;

    const user = await this.getUser(true);

    const {
      id: currentUserId,
    } = user;

    if (parent !== undefined) {

      // const exists = await db.exists.Comment({
      //   id: parent,
      // });

      const Parent = await db.query.comment({
        where: {
          id: parent,
        }
      });


      if (!Parent) {
        return this.addError("Не был получен родительский комментарий");
      }

      const {
        type_id: parent_type_id,
        object_id: parent_object_id,
      } = Parent;

      type_id = parent_type_id
      object_id = parent_object_id

    }
    else {

      if (!type_id) {
        return this.addError("Не был указан тип комментария");
      }

      if (!object_id) {
        return this.addError("Не был указан ID объекта");
      }

    }

    if (!editor_content) {
      this.addFieldError("editor_content", "Не заполнен комментарий");
    }


    const TypeExists = await db.exists.CommentType({
      code: type_id,
    });


    if (!TypeExists) {
      return this.addError("Не был получен тип комментария");
    }


    args.data = {
      ...data,
      created_by: {
        connect: {
          id: currentUserId,
        },
      },
      parent,
      type_id,
      object_id,
      editor_content,
    };

    return super.create(objectType, args, info);
  }


  async update(objectType, args, info) {

    const {
      db,
    } = this.ctx;

    const user = await this.getUser(true);

    const {
      id: userId,
      sudo,
    } = user;

    let {
      where,
    } = args;

    const comment = (await db.query.comments({
      where: {
        ...where,
        created_by: sudo === true ? undefined : {
          id: userId,
        }
      },
      first: 1,
    }))[0];



    if (!comment) {
      this.addError("Не был получен комментарий");
    }




    return super.update(objectType, args, info);
  }


  async mutate(method, args, info) {

    const user = await this.getUser(true);

    // return this.addError("Test");

    return super.mutate(method, args);
  }




  async prepareNotificationLetter(method, object) {

    if(!object){
      return;
    }
 

    switch (method) {

      case "createComment":

        method = "Создан комментарий";

        break;

      case "updateComment":

        method = "Отредактирован комментарий";

        break;

    }

    const {
      id,
      comment_id,
    } = object


    let link = `http://pivkarta.ru/comments/comment-${comment_id}.html`;

    return `
      <h3>${method}</h3>

      <p>
        <a href="${link}">${link}</a>
      </p>
    `;


    return null;
  }

}


const comment = function (parent, args, ctx, info) {

  return ctx.db.query.comment({}, info)
}


const comments = function (parent, args, ctx, info) {

  return ctx.db.query.comments({}, info)
}

const commentsConnection = function (parent, args, ctx, info) {

  // return new Promise(async resolve => {

  //   const result = await ctx.db.query.commentsConnection({}, info);

  //   setTimeout(() => resolve(result), 3000);

  // });

  return ctx.db.query.commentsConnection({}, info);
}


const createCommentProcessor = function (parent, args, ctx, info) {

  return new CommentsPayload(ctx).createWithResponse("Comment", args, info);
}


const updateCommentProcessor = function (parent, args, ctx, info) {

  return new CommentsPayload(ctx).updateWithResponse("Comment", args, info);
}


const CommentResponse = {

  data: (source, args, ctx, info) => {

    const {
      id,
    } = source.data || {};

    return id ? ctx.db.query.comment({ where: { id, } }, info) : null;

  },
}


const Comment = {

  uri: source => {

    const {
      comment_id,
    } = source;

    return comment_id ? `/comments/comment-${comment_id}.html` : null;

  },
};

 

export default class CommentModule extends PrismaModule {


  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, { 
      comment,
      comments,
      commentsConnection,
    });


    Object.assign(resolvers.Mutation, { 
      createCommentProcessor,
      updateCommentProcessor,
    });




    Object.assign(resolvers, { 
      CommentResponse,
      Comment,
    });


    return resolvers;
  }


}

