import * as React from 'react';
import {connect} from "react-redux";
import PostItem from './post';
import {IPost} from '../reducers/feed';

export interface IFeedProps {
    posts: IPost[];
    dispatch?: (e: { type: string }) => void
}

let Feed = ({ posts, dispatch}: IFeedProps) => (
    <div>
    {
        posts.map(post =>
            <PostItem key= { post._id } title= { post.title } text= { post.text } author= { post.author } date= { new Date(post.date) } />
        )
    }
    </div>
);

Feed = connect(state => state.feed)(Feed);

export default Feed;