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

const PostItem = ({ url, title, description, comment, date, author, image }) => (
    <Card className="post">
        {author && <CardHeader
            title={author.displayName}
            subtitle={(new Date(date)).toLocaleDateString()}
            avatar={author.vkPhotoUrl} />}
        <CardMedia
            style={cardMediaStyle}
            overlay={<CardTitle title={title} subtitle={description} />}
            onTouchTap={() => window.open(url, '_blank')}>
            <img src={image} alt={title} />
        </CardMedia>
        {comment && <CardText>{comment}</CardText>}
    </Card>
);

export default PostItem;
