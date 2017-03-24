import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { Grid, InfiniteLoader, WindowScroller } from 'react-virtualized';

import FlatButton from 'material-ui/FlatButton';

import PostItem from './../../components/post/post';
import NewPost from './new-post/new-post';

import * as feedActions from './feed.actions';
import * as newPostActions from './new-post/new-post.actions';
import { isEditor, isAdmin, isAuthorOf } from '../../utils/common-utils';

class FeedContainer extends React.Component {

    constructor(props) {
        super(props);
        this.gridWidth = 1600;
        this.rowHeight = 450;
        this.columnCount = 3; // TODO: grid should be responsive
        this.columnWidth = 520;
        // Number of columns to render before/after the visible slice of the grid.
        this.overscanRowCount = 3;
        // Threshold at which to pre-fetch data. A threshold X means that data will start loading when a user scrolls within X rows.
        this.threshold = 3;
        this.fetchPosts = this.fetchPosts.bind(this);
        this.isRowLoaded = this.isRowLoaded.bind(this);
        this.loadMoreRows = this.loadMoreRows.bind(this);
        this.rowCount = this.rowCount.bind(this);
        this.mapTwoDimensionalIndexesToOneDimensional = this.mapTwoDimensionalIndexesToOneDimensional.bind(this);
    }

    componentWillMount() {
        this.fetchPosts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.postsType !== prevProps.postsType) {
            this.fetchPosts();
        }
    }

    rowCount(posts) {
        return Math.ceil((posts || this.props.posts).size / this.columnCount);
    }

    fetchPosts(from = 0, limit = this.columnCount * 6) {
        return this.props.fetchPosts(this.props.postsType, from, limit);
    }

    isRowLoaded({ index }) {
        return index < this.rowCount();
    }

    loadMoreRows({ startIndex, stopIndex }) {
        return this.fetchPosts(startIndex * this.columnCount, (stopIndex - startIndex) * this.columnCount);
    }

    mapRowRenderInfo({ rowOverscanStartIndex, rowOverscanStopIndex, rowStartIndex, rowStopIndex }) {
        return {
            overscanStartIndex: rowOverscanStartIndex,
            overscanStopIndex: rowOverscanStopIndex,
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex,
        };
    }

    mapTwoDimensionalIndexesToOneDimensional(columnIndex, rowIndex) {
        return (rowIndex * this.columnCount) + columnIndex;
    }

    render() {
        const { posts, account, deletePost, editPost, allPostsLoaded } = this.props;
        return (
            <div>
                <WindowScroller>
                    {({ height, scrollTop }) => (
                        <InfiniteLoader
                            isRowLoaded={this.isRowLoaded}
                            loadMoreRows={this.loadMoreRows}
                            rowCount={allPostsLoaded ? this.rowCount(posts) : Number.MAX_VALUE}
                            threshold={this.threshold}>
                            {({ onRowsRendered, registerChild }) => (
                                <Grid
                                    ref={registerChild}
                                    onSectionRendered={info => onRowsRendered(this.mapRowRenderInfo(info))}
                                    autoHeight
                                    height={height}
                                    width={this.gridWidth}
                                    scrollTop={scrollTop}
                                    overscanRowCount={this.overscanRowCount}
                                    rowCount={this.rowCount(posts)}
                                    rowHeight={this.rowHeight}
                                    columnCount={this.columnCount}
                                    columnWidth={this.columnWidth}
                                    cellRenderer={({ columnIndex, rowIndex, style, key }) => {
                                        const post = posts.get(this.mapTwoDimensionalIndexesToOneDimensional(columnIndex, rowIndex));
                                        return post && (
                                            <div key={key} style={style}>
                                                <PostItem
                                                    onDelete={() => deletePost(post._id)}
                                                    showDeleteButton={account && (isAdmin(account) || isAuthorOf(account, post))}
                                                    actions={canSubmit(account, post) && (
                                                        <FlatButton label="Approve" onTouchTap={() => editPost(post)} />
                                                    )}
                                                    {...post} />
                                            </div>
                                        );
                                    }} />
                            )}
                        </InfiniteLoader>
                    )}
                </WindowScroller>
                {account && <NewPost suggest={!isEditor(account)} />}
            </div>
        );
    }
}

FeedContainer.propTypes = {
    account: React.PropTypes.object,
    posts: React.PropTypes.instanceOf(List),
    fetchPosts: React.PropTypes.func,
    deletePost: React.PropTypes.func,
    editPost: React.PropTypes.func,
    allPostsLoaded: React.PropTypes.bool,
};

function canSubmit(user, post) {
    return post.type === 'suggest' && (isAdmin(user) || isEditor(user));
}

export default connect(
    (state, ownProps) => ({
        ...state.feed.toObject(),
        ...state.user,
        postsType: ownProps.location.query.type,
    }),
    dispatch => bindActionCreators({
        ...feedActions,
        ...newPostActions,
    }, dispatch)
)(FeedContainer);
