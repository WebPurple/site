import * as React from 'react';
import {connect} from 'react-redux'

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog'

import PostEditForm from './post.edit.form';

let NewPost = ({state, postEditor, dispatch}: {state?, postEditor?, dispatch?}) => (
    <div>
        <FloatingActionButton onTouchTap={() => dispatch({type: 'OPEN_DIALOG'})} style={{position: 'fixed', right: 50, bottom: 50}}>
            <ContentAdd />
        </FloatingActionButton>
        <Dialog title='New post'
                open={state.dialogOpen}
                onRequestClose={() => dispatch({type: 'CLOSE_DIALOG'})}>
            <PostEditForm {...postEditor}/>
        </Dialog>
    </div>
);

NewPost = connect(state => state.newPost)(NewPost);

export default NewPost;