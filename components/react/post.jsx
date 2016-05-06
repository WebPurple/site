import * as React from 'react';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
var Card = require('material-ui/lib/card/card');
var CardHeader = require('material-ui/lib/card/card-header');
var CardTitle = require('material-ui/lib/card/card-title');
var CardText = require('material-ui/lib/card/card-text');
var CardMedia = require('material-ui/lib/card/card-media');

var cardMediaStyle = {
    maxHeight: 250,
    overflow: 'hidden',
    cursor: 'pointer'
};

const PostItem = ({link, text, linkTitle, date, author, imageLink}) => (
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