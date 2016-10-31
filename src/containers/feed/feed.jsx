import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';

import PostItem from './../../components/post/post';
import NewPost from './new-post/new-post';

import * as feedActions from './feed.actions';
import * as newPostActions from './new-post/new-post.actions';
import { isEditor, isAdmin, isAuthorOf } from '../../utils/common-utils';

import styles from './feed.less';

class FeedContainer extends React.Component {

    componentWillMount() {
        this.props.fetchPosts(this.props.postsType);
    }

    componentDidUpdate(prevProps) {
        if (this.props.postsType !== prevProps.postsType) {
            this.props.fetchPosts(this.props.postsType);
        }
    }

    render() {
        const { posts, account, deletePost, editPost } = this.props;
        return (
            <div>
                <div className={styles.feed}>
                    {posts.map(post => (
                        <PostItem
                            key={post._id}
                            onDelete={() => deletePost(post._id)}
                            showDeleteButton={account && (isAdmin(account) || isAuthorOf(account, post))}
                            actions={canSubmit(account, post) && (
                                <FlatButton label="Approve" onTouchTap={() => editPost(post)} />
                            )}
                            {...post} />
                    ))}
                </div>
                {account && <NewPost suggest={!isEditor(account)} />}
            </div>
        );
    }
}

function canSubmit(user, post) {
    return post.type === 'suggest' && (isAdmin(user) || isEditor(user));
}

export default connect(
    (state, ownProps) => ({
        ...state.feed,
        ...state.user,
        postsType: ownProps.location.query.type,
    }),
    dispatch => bindActionCreators({
        ...feedActions,
        ...newPostActions,
    }, dispatch)
)(FeedContainer);
