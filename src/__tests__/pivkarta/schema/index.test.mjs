
import expect from 'expect'

import chalk from "chalk";

import {
  verifySchema,
} from "../../server/default/schema.test.mjs";

import TestModule from "../../../server/modules";


import mocha from 'mocha'
const { describe, it } = mocha

const module = new TestModule();


/**
 */

const requiredTypes = [
  {
    name: "Query",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "Route",
    fields: {
      both: [
        "id",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "User",
    fields: {
      both: [
        "id",
      ],
      prisma: [
      ],
      api: [
        "hasEmail",
        "hasPhone",
      ],
    },
  },
  {
    name: "Beer",
    fields: {
      both: [
        "id",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "Place",
    fields: {
      both: [
        "id",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "UserNotice",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "user_id",
        "notice_id",
        "active",
        "User",
        "Notice",
      ],
    },
  },
  {
    name: "Notice",
    fields: {
      both: [
      ],
      prisma: [
      ],
      api: [
        "id",
        "name",
        "comment",
        "rank",
        "UsersNotices",
      ],
    },
  },
  {
    name: "Resource",
    fields: {
      both: [
        // "id",
        // "published",
        // "deleted",
        // "hidemenu",
        // "searchable",
        // "CreatedBy",
        // "Tags",
        // "rating",
        // "positiveVotesCount",
        // "negativeVotesCount",
        // "neutralVotesCount",
        // "Votes",
        // "CommentTarget",
        // "Comments",
        // "Topics",
        // "Blog",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "Tag",
    fields: {
      both: [
        // "id",
        // "createdAt",
        // "updatedAt",
        // "name",
        // "status",
        // "Resources",
        // "CreatedBy",
      ],
      prisma: [
      ],
      api: [
        "count",
        "topic_ids",
      ],
    },
  },
  {
    name: "ResourceTag",
    fields: {
      both: [
        // "id",
        // "createdAt",
        // "updatedAt",
        // "status",
        // "CreatedBy",
        // "Resource",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "Vote",
    fields: {
      both: [
        // "id",
        // "Resource",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
  {
    name: "Log",
    fields: {
      both: [
        "id",
      ],
      prisma: [
      ],
      api: [
      ],
    },
  },
]




describe('modxclub Verify prisma Schema', () => {

  verifySchema(module.getSchema(), requiredTypes);

});


describe('modxclub Verify API Schema', () => {

  verifySchema(module.getApiSchema(), requiredTypes);

});