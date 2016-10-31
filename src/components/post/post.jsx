import * as React from 'react';

import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CardMedia from 'material-ui/Card/CardMedia';
import CardActions from 'material-ui/Card/CardActions';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

import Dotdotdot from 'react-dotdotdot';

import styles from './post.less';

const PostItem = ({ url, title, description, comment, date, author, image, onDelete, showDeleteButton, actions }) => (
    <Card className={styles.post}>
        {author && (
            <CardHeader
                title={author.displayName}
                subtitle={(new Date(date)).toLocaleDateString()}
                avatar={author.vkPhotoUrl}>
                {showDeleteButton && (
                    <IconButton className={styles['close-button']} onTouchTap={onDelete}><Close /></IconButton>
                )}
            </CardHeader>
        )}
        <CardMedia
            className={styles.media}
            overlay={<CardTitle
                title={title}
                subtitle={<Dotdotdot clamp={3}>{description}</Dotdotdot>} />}
            onTouchTap={() => window.open(url, '_blank')}>
            <img src={image} alt={title} />
        </CardMedia>
        {comment && <CardText>{comment}</CardText>}
        <CardActions>
            {actions}
        </CardActions>
    </Card>
);

export default PostItem;
