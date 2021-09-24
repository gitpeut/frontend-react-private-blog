import React from 'react';

import posts from '../data/posts.json';
import {
    Link,
} from 'react-router-dom';

function PostsPage( {isAuthenticated} ) {

  const postCount = posts.length;



  return (
    // <PrivateRouter isAuthenticated={isAuthenticated}>
    <div className="page-container">
        <h1>Posts ({postCount} posts available) </h1>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus magnam neque pariatur, possimus praesentium veniam? Debitis distinctio doloremque eos molestias mollitia odio perspiciatis praesentium, quia quibusdam, quo, reprehenderit saepe voluptatem.
        <ol>
        { posts.map( (post)=> <li key={post.id}><Link className="bloglist-link" to={`/blog/${post.id}`}>{post.title}</Link></li>)}
        </ol>
    </div>
    // </PrivateRouter>
  );
}

export default PostsPage;