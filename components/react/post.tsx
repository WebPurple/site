import * as React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

export interface IPostProps {
    title: string;
    text: string;
    author: string;
    date: Date;
}

const PostItem = ({title, text, date, author}: IPostProps) => (
    <Card>
        <CardHeader
            title={ author }
            subtitle= { date.toLocaleDateString() }
            avatar="http://lorempixel.com/100/100/nature/"
        />
        <CardTitle title={title} />
        <CardText>
            {text}
        </CardText>
    </Card>
    );     

export default PostItem;