
// import Payload from '../modules/@prisma-cms/prisma-processor';
// import {getUserId} from '../modules/@prisma-cms/prisma-auth';

import Payload from '@prisma-cms/prisma-processor';
import {getUserId} from '@prisma-cms/prisma-auth';

const moment = require("moment");

const getTime = function(){

  return moment().format().replace(/\+.*/, '');

}




const hasPermission = async (ctx, userId, permission) => {

  let allow = false;

  console.log("hasPermission", userId);

  if(userId){

    const user = await ctx.db.query.user({
      where: {
        id: userId,
      },
    });

    if(user){
      allow = ["Fi1osof", "alex"].indexOf(user.username) !== -1;
    }

  }

  return allow;

}
  
  
module.exports = {
  getTime,
  getUserId,
  hasPermission,
  Payload,
}