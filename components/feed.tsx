import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PostItem} from 'post';

interface IPost {
    title: string;
    content: string;
    key: number;
}

export interface IFeedState {
    postList?: IPost[];
}

export interface IFeedProps {
}

export class Feed extends React.Component<IFeedProps, IFeedState> {
    state: IFeedState = {
        postList: [{ title: "First Post", content: "Bla Bla Bla", key: 0}]
    }

    constructor(props: any) {
        super(props);
        //setTimeout(() => this.addPost("First Post", "Bla Bla Bla"), 0);
    }

    render() {
        var list = this.state.postList.map(post => {
            return <PostItem title={post.title} content={post.content} key={post.key}></PostItem>;
        });
        return <div>{ list }</div>;
    }

    addPost(title: string, content: string) {
        var list = this.state;
        list.postList.push({
            title: title,
            content: content,
            key: 0
        });
        this.setState(list);
    }
}

//document.addEventListener('DOMContentLoaded', () => ReactDOM.render(<Feed />, document.getElementById('main')));
