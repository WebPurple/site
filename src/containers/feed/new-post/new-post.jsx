import * as React from 'react';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Create from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';

import PostEditForm from '../post-edit-form/post-edit-form';

import styles from './new-post.less';

const NewPostComponent = ({ state, postEditor, onDialogOpen, onDialogClose }) => (
    <div>
        <FloatingActionButton onTouchTap={onDialogOpen} className={styles['new-post-button']}>
            <Create />
        </FloatingActionButton>
        <Dialog
            title="New post"
            open={state.dialogOpen}
            autoScrollBodyContent
            onRequestClose={onDialogClose}>
            <PostEditForm {...postEditor} />
        </Dialog>
    </div>
);

const NewPostContainer = connect(
    state => state.newPost,
    dispatch => ({
        onDialogOpen: () => dispatch({ type: 'OPEN_DIALOG' }),
        onDialogClose: () => dispatch({ type: 'CLOSE_DIALOG' }),
    })
)(NewPostComponent);

export default NewPostContainer;
