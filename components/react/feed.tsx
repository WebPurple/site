import * as React from 'react';
import {connect} from "react-redux";

import PostItem from './post';
import {IPost} from '../vo/index'

export interface IFeedProps {
    posts: IPost[];
    dispatch: Redux.Dispatch
}

const FeedComponent = ({posts, dispatch}: IFeedProps) => (
    <div>
        {
            posts.map(post =>
                <PostItem key={post._id}
                          title={post.title}
                          text={post.text}
                          author={post.author}
                          date={new Date(post.date)}/>
            )
        }
    </div>
);

const FeedContainer = connect(state => state.feed)(FeedComponent);

export default FeedContainer;