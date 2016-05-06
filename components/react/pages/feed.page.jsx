import * as React from 'react';
import {connect} from "react-redux";

import PostItem from './../post';
import NewPost from './../post/new-post';

const FeedComponent = ({posts, account}) => (
    <div>
        <div className="feed">
            {posts.map(post => <PostItem key={post._id} {...post}/>)}
        </div>
        {account && account._id ? <NewPost/> : ''}
    </div>
);

const FeedContainer = connect(state => Object.assign({}, state.feed, state.user))(FeedComponent);

export default FeedContainer;