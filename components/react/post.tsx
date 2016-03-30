import * as React from "react";

import * as Card from "material-ui/lib/card/card";
import * as CardHeader from "material-ui/lib/card/card-header";
import * as CardText from "material-ui/lib/card/card-text";
import * as CardMedia from "material-ui/lib/card/card-media";

import {IPost} from '../vo/index';

const PostItem = ({text, date, author, imageLink}: IPost) => (
    <Card className='post'>
        <CardMedia style={{maxHeight: 270, overflow: 'hidden'}}
            overlay={<CardHeader title={author.vkDisplayName || author.fbDisplayName}
            subtitle={(new Date(date)).toLocaleDateString()}
            avatar={author.vkPhotoUrl}/>}>
            <img src={imageLink}/>
        </CardMedia>
        <CardText>
            {text}
        </CardText>
    </Card>
);

export default PostItem;