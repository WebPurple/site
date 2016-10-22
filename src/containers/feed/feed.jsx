import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostItem from './../../components/post/post';
import NewPost from './new-post/new-post';

import { fetchPosts, deletePost } from './feed.actions';
import { isEditor, isAdmin } from '../../utils/common-utils';

import styles from './feed.less';

class FeedContainer extends React.Component {

    componentWillMount() {
        this.props.fetchPosts();
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
                            showDeleteButton={account && (isAdmin(account) || (isEditor(account) && account._id === post.author._id))}
                            {...post} />
                    ))}
                </div>
                {account && isEditor(account) ? <NewPost /> : ''}
            </div>
        );
    }
}

export default connect(
    state => ({ ...state.feed, ...state.user }),
    dispatch => bindActionCreators({
        fetchPosts,
        onDeletePost: deletePost,
    }, dispatch)
)(FeedContainer);
