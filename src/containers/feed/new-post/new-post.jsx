import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Create from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';

import PostEditForm from '../post-edit-form/post-edit-form';
import * as actions from './new-post.actions';

import styles from './new-post.less';

const NewPostContainer = ({ state, postEditor, openDialog, closeDialog, submitPostForm, suggest }) => (
    <div>
        <FloatingActionButton title={title(suggest)} onTouchTap={openDialog} className={styles['new-post-button']}>
            <Create />
        </FloatingActionButton>
        <Dialog
            title={title(suggest)}
            open={state.dialogOpen}
            autoScrollBodyContent
            onRequestClose={closeDialog}>
            <PostEditForm onSubmit={post => submitPostForm({ ...post, suggest })} extended={!suggest} {...postEditor} />
        </Dialog>
    </div>
);

function title(suggest) {
    return `${suggest ? 'Suggest' : 'Add'} new post`;
}

export default connect(
    state => state.newPost,
    dispatch => bindActionCreators(actions, dispatch)
)(NewPostContainer);
