import * as React from 'react';

import * as Card from 'material-ui/lib/card/card';
import * as CardHeader from 'material-ui/lib/card/card-header';
import * as CardTitle from 'material-ui/lib/card/card-title';
import * as CardText from 'material-ui/lib/card/card-text';
import * as CardMedia from 'material-ui/lib/card/card-media';

import {IPost} from '../vo/index';

var cardMediaStyle = {
    maxHeight: 250,
    overflow: 'hidden',
    cursor: 'pointer'
};

const PostItem = ({link, text, linkTitle, date, author, imageLink}: IPost) => (
    <Card className='post'>
        <CardHeader
            title={author.displayName}
            subtitle={(new Date(date)).toLocaleDateString()}
            avatar={author.vkPhotoUrl}/>
        <CardMedia style={cardMediaStyle} overlay={<CardTitle title={linkTitle}/>} onTouchTap={() => window.open(link, '_blank')}>
            <img src={imageLink}/>
        </CardMedia>
        <CardText>{text}</CardText>
    </Card>
);

export default PostItem;