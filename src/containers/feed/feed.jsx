import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { Grid, InfiniteLoader, WindowScroller } from 'react-virtualized';

import FlatButton from 'material-ui/FlatButton';

import PostItem from './../../components/post/post';
import NewPost from './new-post/new-post';
import styles from '../navigation/navigation-bar.less';

import * as feedActions from './feed.actions';
import * as newPostActions from './new-post/new-post.actions';
import { isEditor, isAdmin, isAuthorOf } from '../../utils/common-utils';

class FeedContainer extends React.Component {

    constructor(props) {
        super(props);
        this.gridWidth = 1600;
        this.rowHeight = 450;
        // Number of columns to render before/after the visible slice of the grid.
        this.overscanRowCount = 3;
        // Threshold at which to pre-fetch data. A threshold X means that data will start loading when a user scrolls within X rows.
        this.threshold = 3;
        this.fetchPosts = this.fetchPosts.bind(this);
        this.isRowLoaded = this.isRowLoaded.bind(this);
        this.loadMoreRows = this.loadMoreRows.bind(this);
        this.rowCount = this.rowCount.bind(this);
        this.mapTwoDimensionalIndexesToOneDimensional = this.mapTwoDimensionalIndexesToOneDimensional.bind(this);
        this.state = {
            columnCount: 3,
            columnWidth: 520,
        };
    }

    componentWillMount() {
        this.fetchPosts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.postsType !== prevProps.postsType) {
            this.fetchPosts();
        }
        if (this.props.leftNav !== prevProps.leftNav) {
            this.updateColumns(true);
        }
    }

    componentDidMount() {
        this.updateColumns();
        window.addEventListener('resize', (event) => {
            this.updateColumns();
        });
    }

    updateColumns(componentUpdate) {
        let navBarWidth = 0;
        if (componentUpdate) {
            let width = document.getElementsByClassName(styles.navigation)[0].offsetWidth;
            navBarWidth = this.props.leftNav.leftNavOpen ? -width : width;
        }
        let feedBox = document.getElementsByClassName('feed-container')[0];
        let columnCount = Math.floor((feedBox.offsetWidth + navBarWidth ) / 520);
        this.setState({
            columnCount: columnCount,
            columnWidth: Math.floor((feedBox.offsetWidth + navBarWidth) / columnCount),
        });
    }

    rowCount(posts) {
        return Math.ceil((posts || this.props.posts).size / this.state.columnCount);
    }

    fetchPosts(from = 0, limit = this.state.columnCount * 6) {
        return this.props.fetchPosts(this.props.postsType, from, limit);
    }

    isRowLoaded({ index }) {
        return index < this.rowCount();
    }

    loadMoreRows({ startIndex, stopIndex }) {
        return this.fetchPosts(startIndex * this.state.columnCount, (stopIndex - startIndex) * this.state.columnCount);
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
        return (rowIndex * this.state.columnCount) + columnIndex;
    }

    render() {
        const { posts, account, deletePost, editPost, allPostsLoaded } = this.props;
        return (
            <div className={'feed-container'}>
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
                                    height={1600}
                                    width={this.state.columnWidth * this.state.columnCount}
                                    scrollTop={scrollTop}
                                    overscanRowCount={this.overscanRowCount}
                                    rowCount={this.rowCount(posts)}
                                    rowHeight={this.rowHeight}
                                    columnCount={this.state.columnCount}
                                    columnWidth={this.state.columnWidth}
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
                                    }}
                                />
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
    allPostsLoaded: React.PropTypes.bool
};

function canSubmit(user, post) {
    return post.type === 'suggest' && (isAdmin(user) || isEditor(user));
}

export default connect(
    (state, ownProps) => ({
        ...state.feed.toObject(),
        ...state.user,
        leftNav: state.leftNav,
        postsType: ownProps.location.query.type,
    }),
    dispatch => bindActionCreators({
        ...feedActions,
        ...newPostActions,
    }, dispatch)
)(FeedContainer);
