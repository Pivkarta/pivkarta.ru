
import Payload from '@prisma-cms/prisma-processor';

import moment from "moment";


const getTime = function () {

  return moment().format().replace(/\+.*/, '');

}


const getUserId = async function(ctx){

  const {
    currentUser,
  } = ctx;

  return currentUser && currentUser.id || null;

}


const hasPermission = async (ctx, userId, permission) => {

  let allow = false;

  //  console.log("hasPermission", userId);

  if (userId) {

    const user = await ctx.db.query.user({
      where: {
        id: userId,
      },
    });

    if (user) {
      allow = ["Fi1osof", "alex", "master"].indexOf(user.username) !== -1;
    }

  }

  return allow;

}


export {
  getTime,
  getUserId,
  hasPermission,
  Payload,
}