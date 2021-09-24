import React from 'react';
import {useParams} from "react-router-dom";
import posts from '../data/posts.json';

function BlogPage() {
  const {id} = useParams();

  // om de goede post eruit te halen, moeten we de posts filteren,
  // en alleen de post eruit halen met het id dat in de parameters is meegegeven
  const filteredPosts = posts.filter( (post)=>post.id === id );
  // filteredPosts is ook een array, maar als het goed is met maar 1 element.
  // Om het leesbaar te houden, maken we dat een aparte variabele.
  const thisPost = filteredPosts[0];

  return (
    <div className="blog-text">
        <h2>Blog {thisPost.id} -  {thisPost.title}</h2>
        {posts[id].content}
        <p className="kleine-lettertjes" > Geupload op {thisPost.date}</p>
    </div>
  );
}

export default BlogPage;