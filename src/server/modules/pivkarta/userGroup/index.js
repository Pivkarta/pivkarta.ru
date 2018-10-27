

const userGroups = (source, args, ctx, info) => {

  return ctx.db.query.userGroups(source, info);
}

const Query = {
  userGroups,
};

export default {
  resolvers: {
    Query,
  },
}