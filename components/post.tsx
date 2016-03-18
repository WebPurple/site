import * as React from 'react';

export interface IPostState {
}

export interface IPostProps {
    title: string;
    content: string;
}

export class PostItem extends React.Component<IPostProps, IPostState> {
    render() {
        return (
            <div>
                <span>{this.props.title}</span>
                <span>{this.props.content}</span>
            </div>
        );
    }
}
