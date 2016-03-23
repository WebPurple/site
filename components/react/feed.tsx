import * as React from 'react';
import PostItem from './post';

interface IPost {
    title: string;
    text: string;
    author: string;
    date: string;
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
            postList: []
        };


        fetch("./api/posts")
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject(new Error(response.statusText));
                }
                return response.json();
            }).then((postList: IPost[]) => {
                this.setState({postList});
            });
    }

    render() {
        var list = this.state.postList.map(post => {
            return <PostItem key={post._id} title={post.title} text={post.text} author={post.author} date={new Date(post.date)} />;
        });
        return <div>{ list }</div>;
    }
}
