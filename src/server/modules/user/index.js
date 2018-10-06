
import PrismaModule from "@prisma-cms/prisma-module";



import shortid from "shortid";
import chalk from "chalk";

const isemail = require("isemail");

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
  getUserId,
  Payload,
} = require('../utilites');
// } = require('react-cms-graphql-utils/src/auth');


const createPassword = async (password) => {

  if (!password) {
    throw (new Error("Пароль не может быть пустым"));
  }

  return await bcrypt.hash(password, 10);
}


class UserPayload extends Payload {


  async signin(source, args, ctx, info) {


    const {
      username,
      password,
    } = args;

    const users = await ctx.db.query.users({
      first: 1,
      where: {
        OR: [{
          username,
        },{
          email: username,
        }],
      }
    });

    const user = users && users[0] || null;

    if (!user) {
      this.addFieldError("username", "Пользователь не был найден");
    }
    else if(!await bcrypt.compare(password, user.password)){

      this.addFieldError("password", "Неверный пароль");
    }

    // console.log("Sign in user", user);

    let token;

    if(!this.hasErrors()){
      this.data = user;
      
      token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    }


    const result = this.prepareResponse();

    return {
      ...result,
      token,
    }

  }

  async signup(method, source, args, ctx, info) {

    let {
      username,
      fullname,
      email,
      password,
    } = args;

    const {
      db,
    } = ctx;

    let token;


    if (!password) {
      this.addFieldError("password", "Укажите пароль");
    }


    if (!username) {
      this.addFieldError("username", "Укажите логин");
    }
    else if (isemail.validate(username)) {
      this.addFieldError("username", "Не указывайте емейл в качестве логина, заспамят.");
    }
    // Проверяем есть ли пользователь с таким ником
    else if (await db.query.user({
      where: {
        username,
      },
    })) {
      // throw ("Пользователь с таким логином уже зарегистрирован");
      this.addFieldError("username", "Пользователь с таким логином уже зарегистрирован");
    }

    // Проверяем есть ли пользователь с таким емейлом
    if (!email) {
      this.addFieldError("email", "Укажите емейл");
    }
    else if (!isemail.validate(email)) {

      this.addFieldError("email", "Укажите корректный емейл");

    }
    else if (await db.query.user({
      where: {
        email,
      },
    })) {
      // throw ("Пользователь с таким емейлом уже зарегистрирован");
      this.addFieldError("email", "Пользователь с таким емейлом уже зарегистрирован");
    }


    if (!this.hasErrors()) {

      password = await bcrypt.hash(args.password, 10);

      const user = await ctx.db.mutation.createUser({
        data: { ...args, password },
      })
        .then(r => {
          console.log("signup result", r);
          return r;
        })
        .catch(e => {
          console.error("signup error", e);
          return e;
        });

      this.data = user;

      token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    }


    const result = this.prepareResponse();

    return {
      ...result,
      token,
    }

  }

  async update(objectType, args, info) {

    const userId = await getUserId(this.ctx);

    let {
      data: {
        // username,
        password,
        fullname,
        image,
        sudo,
        // professionalism,
        // Groups,
      },
      where = {},
      id,
    } = args;


    if (password !== undefined) {

      if (password) {
        password = await createPassword(password);
      }
      else {
        // this.addFieldError("password", "Пароль не должен быть пустым");
        password = undefined;
      }

    }


    let updateData = {
      // username,
      password,
      fullname,
      image,
    };


    const {
      db,
    } = this.ctx;


    if (id) {
      where = {
        id,
      }
    }


    const currentUser = await this.getUser();

    console.log("Current user", currentUser);

    if (!this.hasErrors()) {

      // Очищаем все аргументы
      // info.fieldNodes.map(n => {
      //   n.arguments = []
      // });

      // Получаем обновляемого пользователя
      // const user = await db.query.user({
      //   where,
      // });

      let user;

      if (Object.keys(where).length) {
        user = await this.query("user", {
          where,
        });
      }
      else {
        user = currentUser;
      }

      if (!user) {
        this.addError("Не был получен пользователь");
      }
      else {

        if (currentUser.sudo === true) {

          Object.assign(updateData, {
            sudo,
            // Groups,
          });

        }
        else {

          /**
           * Если обновляемый пользователь не текущий, то проверяем права это делать
           */
          if (user.id !== currentUser.id) {

            this.addError("Нет прав");

          }

        }




        return super.update(objectType,
          {
            where: {
              id: user.id,
            },
            data: updateData,
          },
          // info,
        );
      }

    }


    // return this.prepareResponse();
  }

  // async mutate(method, args, info) {

  //   // return super.mutate(method, args, info);
  //   return super.mutate(method, args);

  // }

}


const usersConnection = async function (parent, args, ctx, info) {

  let data = await ctx.db.query.usersConnection({}, info);

  if (data) {

    if (data.edges) {
      data.edges = data.edges.map(n => {
        return n && n.node ? {
          ...n,
          node: {
            ...n.node,
            email: "",
          },
        } : n;
      })
    }

    return data;
  }
  else {
    return null;
  }

}

const users = async function (parent, args, ctx, info) {

  return ctx.db.query.users({}, info);


  // return users ? users.map(n => ({
  //   ...n,
  //   email: "",
  // })) : null;
}

const user = async function (parent, args, ctx, info) {

  const user = await ctx.db.query.user({

  }, info);

  if (user) {

    // const {
    //   email,
    //   ...userData
    // } = user;

    return {
      ...user,
      email: "",
    };

  }
  else {
    return null;
  }
}

const me = async function (parent, args, ctx, info) {

  return ctx.currentUser;

  // const id = await getUserId(ctx)
  // .catch(console.error);

  // return id ? await ctx.db.query.user({ where: { id } }, info) : null;
}



const signup = async function (source, args, ctx, info) {



  return new UserPayload(ctx).signup("userCreate", source, args, ctx, info);
}

const signin = async function (source, args, ctx, info) {


  return new UserPayload(ctx).signin(source, args, ctx, info);
}



const updateUser = async function (source, args, ctx, info) {

  const result = await new UserPayload(ctx).updateWithResponse("User", args, info);

  console.log("updateUser", result);

  return result;
}


// const updateUser = async function (parent, args, ctx, info) {

//   // throw new Error(`Post test`)

//   const userId = getUserId(ctx);

//   let {
//     data: {
//       // sudo,
//       // email,
//       // username,
//       // created_at,
//       // ip,
//       // etherwallet,
//       // topics,
//       // comments,
//       // files,
//       // Tarifs,
//       // Account,
//       // ...data
//       fullname,
//       image,
//     },
//   } = args;

//   let where = {
//     id: userId,
//   };


//   // console.log("updateUser where", where);
//   // console.log("updateUser data", data);

//   return ctx.db.mutation.updateUser(
//     {
//       where,
//       data: {
//         fullname,
//         image,
//       },
//     },
//     // info,
//   )
// }


/**
 * Сброс пароля.
 * Так как у пользователей может не быть указан емейл,
 * то пароль сбрасываем только при наличии емейла.
 * 
 * ToDo сделать отправку сообщений через смс
 */
const resetPassword = async function (source, args, ctx, info) {

  const {
    db,
  } = ctx;

  const {
    username,
  } = args;


  const user = await db.query.user({
    where: {
      username,
    },
  })
    ;


  if (!user) {
    throw (new Error("Не был получен пользователь"));
  }


  const {
    id,
    email,
    // username,
  } = user;

  if (!email) {
    throw (new Error("У пользователя не указан емейл"));
  }


  const password = shortid.generate();
  const passwordHash = await createPassword(password);

  const result = await db.mutation.updateUser({
    where: {
      id,
    },
    data: {
      password: passwordHash,
    },
  });

  // Создаем новое сообщение
  db.mutation.createLetter({
    data: {
      email,
      subject: "Новый пароль",
      message: `<h3>Ваш новый пароль</h3>
        <p>
          Емейл: ${email}
        </p>
        <p>
          Логин: ${username}
        </p>
        <p>
          Пароль: ${password}
        </p>
        <p>
          После авторизации Вы сможете сменить пароль в личном кабинете.
        </p>
      `,
    },
  });


  if (result) {
    console.log(chalk.green("resetPassword result"), result);
  }
  else{
    throw(new Error("Ошибка сброса пароля"));
  }

  return true;
}

  
const User = {

  email: (source, args, ctx) => {

    const {
      id,
      email,
    } = source;

    const {
      currentUser,
    } = ctx

    const {
      id: currentUserId,
      sudo,
    } = currentUser || {}

    return currentUserId === id || sudo ? email : "";

  },
}

 

export default class UsersModule extends PrismaModule {


  getResolvers() {


    const resolvers = super.getResolvers();

    Object.assign(resolvers.Query, {
      usersConnection,
      users,
      user,
      me,
    });


    Object.assign(resolvers.Mutation, {

      signin,
      signup,
      // updateUserData,
      updateUser,
      resetPassword,
    });




    Object.assign(resolvers, {
      UserResponse: {
        data: (source, args, ctx, info) => {
    
          const {
            id,
          } = source && source.data || {}
    
          return id ? ctx.db.query.user({
            where: {
              id,
            },
          }, info) : null;
    
        },
      },
      User,
    });


    return resolvers;
  }


}



