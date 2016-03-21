import * as React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

export interface IPostProps {
    title: string;
    content: string;
}

export default class PostItem extends React.Component<IPostProps, {}> {
    render() {
        return (
            <div>
                <FlatButton />
                <span>{this.props.title}</span>
                <span>{this.props.content}</span>
            </div>
        );
    }
}
