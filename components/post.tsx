import * as React from 'react';
import * as FlatButton from 'material-ui/lib/flat-button';

export interface IPostProps {
    title: string;
    content: string;
}

export class PostItem extends React.Component<IPostProps, {}> {
    render() {
        return (
            <div>
                <FlatButton
                    label="Okey"
                    secondary={true}
                />
                <span>{this.props.title}</span>
                <span>{this.props.content}</span>
            </div>
        );
    }
}
