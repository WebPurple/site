import * as React from 'react';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
const Card = require('material-ui/lib/card/card');
const CardHeader = require('material-ui/lib/card/card-header');
const CardTitle = require('material-ui/lib/card/card-title');
const CardText = require('material-ui/lib/card/card-text');
const CardMedia = require('material-ui/lib/card/card-media');

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
