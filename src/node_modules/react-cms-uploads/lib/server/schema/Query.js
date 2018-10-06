'use strict';

var _require = require('react-cms-graphql-utils/src/auth'),
    getUserId = _require.getUserId;

var Query = {
  files: function files(parent, args, ctx, info) {

    // const id = getUserId(ctx)

    var where = {};

    return [];

    return ctx.db.query.files({}, info);
  }
};

module.exports = { Query: Query };