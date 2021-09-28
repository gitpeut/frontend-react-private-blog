import React from 'react';

import posts from '../data/posts.json';
import {
    Link,
} from 'react-router-dom';

function PostsPage({isAuthenticated}) {

    const postCount = posts.length;


    return (

        <div className="page-container">
            <h1>Posts ({postCount} posts available) </h1>
            Petis, ut tibi avunculi mei exitum scribam, quo verius tradere posteris possis.
            Gratias ago; nam video morti eius, si celebretur a te, immortalem gloriam esse
            propositam. Quamvis enim pulcherrimarum clade terrarum, ut populi, ut urbes
            memorabili casu quasi semper victurus occiderit, quamvis ipse plurima opera et
            mansura condiderit, multum tamen perpetuitati eius scriptorum tuorum aeternitas addet.
            Equidem beatos puto, quibus deorum munere datum est aut facere scribenda aut scribere legenda,
            beatissimos vero, quibus utrumque. Horum in numero avunculus meus et suis libris et tuis erit.
            Quo libentius suscipio, deposco etiam, quod iniungis.
            <p className="kleine-lettertjes">(Tacitus aan Plinius)</p>
            <ol>
                {posts.map((post) => <li key={post.id}><Link className="bloglist-link"
                                                             to={`/blog/${post.id}`}>{post.title}</Link></li>)}
            </ol>
        </div>

    );
}

export default PostsPage;