const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    post(id: Int!): Post
    posts: [Post]
  }

  type Post {
    id: Int
    title: String
    comments: [Comment]
  }

  type Comment {
    text: String
    user: String
  }
`);

const posts = [
	{
		id: 1,
		title: 'This is the first title',
		comments: [
			{
				title: "what's up",
				user: 'bob'
			}
		]
	}
];

const root = {
	post: ({ id }) => {
		return posts.find(post => post.id === id);
	},
	posts: () => {
		return posts;
	}
};

const app = express();

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true
	})
);

app.listen(4000);
