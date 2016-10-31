import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostItem from './../../components/post/post';
import NewPost from './new-post/new-post';

import { fetchPosts, deletePost } from './feed.actions';
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
        const { posts, account, onDeletePost } = this.props;
        return (
            <div>
                <div className={styles.feed}>
                    {posts.map(post => (
                        <PostItem
                            key={post._id}
                            onDelete={() => onDeletePost(post._id)}
                            showDeleteButton={account && (isAdmin(account) || isAuthorOf(account, post))}
                            {...post} />
                    ))}
                </div>
                {account && <NewPost suggest={!isEditor(account)} />}
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        ...state.feed,
        ...state.user,
        postsType: ownProps.location.query.type,
    }),
    dispatch => bindActionCreators({
        fetchPosts,
        onDeletePost: deletePost,
    }, dispatch)
)(FeedContainer);
