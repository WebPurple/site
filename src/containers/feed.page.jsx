import * as React from 'react';
import { connect } from 'react-redux';

import PostItem from './../components/post';
import NewPost from './../components/post/new-post';

import { fetchPosts } from '../actions/feed.actions';
import { isEditor } from '../utils/common-utils';

class FeedComponent extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchPosts());
    }

    render() {
        const { posts, account } = this.props;
        return (
            <div>
                <div className="feed">
                    {posts.map(post => <PostItem key={post._id} {...post} />)}
                </div>
                {account && isEditor(account) ? <NewPost /> : ''}
            </div>
        );
    }
}
const FeedContainer = connect(state => Object.assign({}, state.feed, state.user))(FeedComponent);

export default FeedContainer;
