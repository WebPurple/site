import * as React from 'react';
import { connect } from 'react-redux';

import PostEditForm from './post.edit.form';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
const FloatingActionButton = require('material-ui/lib/floating-action-button');
const Create = require('material-ui/lib/svg-icons/content/create');
const Dialog = require('material-ui/lib/dialog');

const NewPostComponent = ({ state, postEditor, onDialogOpen, onDialogClose }) => (
    <div>
        <FloatingActionButton onTouchTap={onDialogOpen} className="new-post-button">
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
