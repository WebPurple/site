import * as React from 'react';
import {connect} from "react-redux";

import PostItem from './../post';
import NewPost from './../post/new-post';
import {IPost, IUser} from '../../vo/index';

export interface IFeedProps {
    posts: IPost[];
    account: IUser;
}

const FeedComponent = ({posts, account}: IFeedProps) => (
    <div>
        <div className="feed">
            {posts.map(post => <PostItem key={post._id} {...post}/>)}
        </div>
        {account && account._id ? <NewPost/> : ''}
    </div>
);

const FeedContainer = connect(state => Object.assign({}, state.feed, state.user))(FeedComponent);

export default FeedContainer;