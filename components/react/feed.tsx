import * as React from 'react';
import {connect} from "react-redux";

import PostItem from './post';
import {IPost} from '../vo/index'

export interface IFeedProps {
    posts: IPost[];
    dispatch: Redux.Dispatch
}

const FeedComponent = ({posts, dispatch}: IFeedProps) => (
    <div className="feed">
        {posts.map(post => <PostItem key={post._id} {...post}/>)}
    </div>
);

const FeedContainer = connect(state => state.feed)(FeedComponent);

export default FeedContainer;