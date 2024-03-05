const getPost = async () => {
  try {
    let res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    let posts = await res.json();
    // console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  try {
    let res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    let users = await res.json();
    // console.log(users);\
    return users;
  } catch (error) {
    console.log(error);
  }
};

const getComment = async () => {
  try {
    let res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    let comments = await res.json();
    // console.log(comments);
    return comments;
  } catch (error) {
    console.log(error);
  }
};

const getRes = async () => {
  try {
    let users = await getUser();
    let posts = await getPost();
    let comments = await getComment();
    const newUser = users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
    const mergedData = newUser.map((user) => {
      const userPosts = posts
        .filter((post) => post.userId === user.id)
        .map((post) => ({
          id: post.id,
          title: post.title,
          body: post.body,
        }));
      // const userComments = comments
      //   .filter((comment) => comment.email === user.email)
      //   .map((comment) => ({
      //     id: comment.id,
      //     postId: comment.postId,
      //     name: comment.name,
      //     body: comment.body,
      //   }));
      const userComments = userPosts.map((post) => {
        const postComments = comments
          .filter((comment) => comment.postId === post.id)
          .map((comment) => ({
            id: comment.id,
            postId: comment.postId,
            name: comment.name,
            body: comment.body,
          }));
        return postComments;
      });
      console.log("newUser:", newUser);
      console.log("userPosts:", userPosts);
      console.log("userComments:", userComments);
      return {
        ...user,
        posts: userPosts,
        comments: userComments,
      };
    });
    //console.log(mergedData);
    return mergedData;
  } catch (error) {
    console.log(error);
  }
};

const getUserRes = async () => {
  const users = await getRes();
  const resUser = users
    .filter((user) => user.comments.length > 3)
    .map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      commentsCount: user.comments.length,
      postsCount: user.posts.length,
    }));
  console.log(resUser);
  return resUser;
};

const sortUser = async () => {
  const users = await getUserRes();
  users.sort((a, b) => b.postsCount - a.postsCount);
  console.log(users);
};

const getDetailUser = async (userId) => {
  const users = await getUserRes();
  const userDetail = users.find((user) => user.id === userId);
  console.log(`UserId:${userId}`, userDetail);
};
//getRes();
//getUserRes();
//sortUser();
getDetailUser(1);
