"use strict";
const moment = require("moment");
const { v4: uuidV4 } = require("uuid");

const fakeBlogPost = (title, body, createdAt) => ({
  id: uuidV4(),
  title,
  body,
  createdAt,
});

const calculateCreatedDays = (createdAt) =>
  moment().diff(createdAt, "days", false);

const presentBlogPost = (blogPost) =>
  blogPost && {
    ...blogPost,
    ageDays: calculateCreatedDays(blogPost.createdAt),
  };

const blogPosts = [
  fakeBlogPost(
    "First Post",
    "This is the first post",
    new Date("2021-03-12 14:00:12"),
  ),
  fakeBlogPost(
    "Second Post",
    "This is the second post",
    new Date("2021-05-11 14:00:12"),
  ),
  fakeBlogPost(
    "Third Post",
    "This is the third post",
    new Date("2021-07-03 11:34:12"),
  ),
];

module.exports.listPosts = async (event) => {
  const { postId } = event;
  const result = postId
    ? presentBlogPost(blogPosts[postId - 1])
    : blogPosts.map(presentBlogPost);

  const response = {
    statusCode: result ? 200 : 404,
    body: JSON.stringify(result),
  };
  return response;
};
