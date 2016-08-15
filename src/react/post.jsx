import * as React from 'react';

import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardMedia from 'material-ui/Card/CardMedia';

const cardMediaStyle = {
    maxHeight: 250,
    overflow: 'hidden',
    cursor: 'pointer',
};

const PostItem = ({ link, text, linkTitle, date, author, imageLink }) => (
    <Card className="post">
        <CardHeader
            title={author.displayName}
            subtitle={(new Date(date)).toLocaleDateString()}
            avatar={author.vkPhotoUrl} />
        <CardMedia style={cardMediaStyle} overlay={<CardTitle title={linkTitle} />} onTouchTap={() => window.open(link, '_blank')}>
            <img src={imageLink} alt={linkTitle} />
        </CardMedia>
        <CardText>{text}</CardText>
    </Card>
);

export default PostItem;
