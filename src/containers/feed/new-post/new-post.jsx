import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Create from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';

import PostEditForm from '../post-edit-form/post-edit-form';
import * as actions from './new-post.actions';

import styles from './new-post.less';

const NewPostComponent = ({ state, postEditor, openDialog, closeDialog, submitPostForm }) => (
    <div>
        <FloatingActionButton onTouchTap={openDialog} className={styles['new-post-button']}>
            <Create />
        </FloatingActionButton>
        <Dialog
            title="New post"
            open={state.dialogOpen}
            autoScrollBodyContent
            onRequestClose={closeDialog}>
            <PostEditForm onSubmit={post => submitPostForm(post)} {...postEditor} />
        </Dialog>
    </div>
);

const NewPostContainer = connect(
    state => state.newPost,
    dispatch => bindActionCreators(actions, dispatch)
)(NewPostComponent);

export default NewPostContainer;
