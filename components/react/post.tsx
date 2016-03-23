import * as React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

export interface IUser {
    gender: string;
    vkDisplayName: string;
    vkPhotoUrl: string;
    vkProfileUrl: string;
    vkUserId: number;
    vkUserName: string;
}

export interface IPostProps {
    title: string;
    text: string;
    author: IUser;
    date: Date;
}

const PostItem = ({ title, text, date, author}: IPostProps) => (
    <Card>
        <CardHeader
            title={ author.vkDisplayName }
            subtitle= { date.toLocaleDateString() }
            avatar={author.vkPhotoUrl }
        />
        <CardTitle title={title} />
        <CardText>
            {text}
        </CardText>
    </Card>
    );     

export default PostItem;