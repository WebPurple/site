import * as React from 'react';
import {connect} from 'react-redux'

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
var FloatingActionButton = require('material-ui/lib/floating-action-button');
var Create = require('material-ui/lib/svg-icons/content/create');
var Dialog = require('material-ui/lib/dialog');

import PostEditForm from './post.edit.form';

const NewPostComponent = ({state, postEditor, onDialogOpen, onDialogClose}) => (
    <div>
        <FloatingActionButton onTouchTap={onDialogOpen} className='new-post-button'>
            <Create/>
        </FloatingActionButton>
        <Dialog title='New post'
                open={state.dialogOpen}
                autoScrollBodyContent={true}
                onRequestClose={onDialogClose}>
            <PostEditForm {...postEditor}/>
        </Dialog>
    </div>
);

const NewPostContainer = connect(
    state => state.newPost,
    dispatch => {
        return {
            onDialogOpen: () => dispatch({type: 'OPEN_DIALOG'}),
            onDialogClose: () => dispatch({type: 'CLOSE_DIALOG'})
        };
    }
)(NewPostComponent);

export default NewPostContainer;