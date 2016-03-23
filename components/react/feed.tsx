import * as React from 'react';
import PostItem from './post';

interface IPost {
    title: string;
    content: string;
    _id: number;
}

export interface IFeedState {
    postList?: IPost[];
}

export interface IFeedProps {
}

export default class Feed extends React.Component<IFeedProps, IFeedState> {

    constructor(props: any) {
        super(props);
        this.state = {
            postList: [{title: "First Post", content: "Bla Bla Bla", _id: 0}]
        }
    }

    render() {
        var list = this.state.postList.map(post => {
            return <PostItem key={post._id} title={post.title} content={post.content}/>;
        });
        return <div>{ list }</div>;
    }
}
