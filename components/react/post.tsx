import * as React from "react";

import * as Card from "material-ui/lib/card/card";
import * as CardHeader from "material-ui/lib/card/card-header";
import * as CardText from "material-ui/lib/card/card-text";

import {IPost} from '../vo/index'

const PostItem = ({text, date, author}: IPost) => (
    <Card style={{marginBottom: 10}}>
        <CardHeader
            title={ author.vkDisplayName }
            subtitle={ date.toLocaleDateString() }
            avatar={author.vkPhotoUrl }
        />
        <CardText>
            {text}
        </CardText>
    </Card>
);

export default PostItem;