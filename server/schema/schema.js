const graphql = require("graphql");
const { FeedbackRequest, Comment, User } = require("../models");
const AuthService = require("../services/auth");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  },
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: {
    id: { type: GraphQLString },
    user: { type: UserType },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  },
});

let requireAuth = (fn) => (parentValue, args, req) => {
  if (!req.user) {
    return null;
  }
  return fn(parentValue, args, req);
};

const FeedbackRequestType = new GraphQLObjectType({
  name: "FeedbackRequest",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    detail: { type: GraphQLString },
    category: { type: GraphQLString },
    status: { type: GraphQLString },
    upvotes: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, args) {
        return Comment.find({ feedback: parentValue.id });
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.user);
      },
    },
  },
});


const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: requireAuth(() => {
        return "hello world";
      }),
    },
    feedbackRequests: {
      type: new GraphQLList(FeedbackRequestType),
      resolve: requireAuth((_, args) => {
        return FeedbackRequest.find();
      }),
    },
    feedbackRequest: {
      type: FeedbackRequestType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: requireAuth((_, { id }) => {
        return FeedbackRequest.findById(id);
      }),
    },

    user: {
      type: UserType,
      resolve: requireAuth((parent, args, req) => {
        return req.user;
      }),
    },

    greetings: {
      type: GraphQLString,
      resolve: requireAuth(() => {
        return "Hello world!";
      }),
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addFeedbackRequest: {
      type: FeedbackRequestType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        detail: {
          type: new GraphQLNonNull(GraphQLString),
        },
        category: {
          type: new GraphQLNonNull(GraphQLString),
        },
        user: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: requireAuth((_, { title, detail, category, user }) => {
        return new FeedbackRequest({ title, detail, category, user }).save();
      }),
    },
    updateFeedbackRequest: {
      type: FeedbackRequestType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        detail: { type: GraphQLString },
        category: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve: requireAuth((_, { id, ...rest }) => {
        console.log(rest);
        return FeedbackRequest.findByIdAndUpdate(id, rest);
      }),
    },
    deleteFeedbackRequest: {
      type: FeedbackRequestType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: requireAuth((_, { id }) => {
        return FeedbackRequest.findByIdAndDelete(id);
      }),
    },

    upvoteFeedbackRequest: {
      type: FeedbackRequestType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: requireAuth((_, { id }) => {
        return FeedbackRequest.upvote(id);
      }),
    },

    addComment: {
      type: CommentType,
      args: {
        feedbackId: { type: GraphQLString },
        comment: { type: GraphQLString },
      },
      resolve: requireAuth((_, { feedbackId, comment }) => {
        return new Comment({ feedback: feedbackId, content: comment }).save();
      }),
    },

    // auth mutations

    signup: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        fullname: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args, req) {
        return AuthService.signup({ ...args, req });
      },
    },

    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { email, password }, req) => {
        return AuthService.login({ email, password, req });
      }
    },

    logout: {
      type: UserType,
      resolve: requireAuth((parent, args, req) => {
        let { user } = req;
        req.logout();
        return user;
      }),
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation,
});
