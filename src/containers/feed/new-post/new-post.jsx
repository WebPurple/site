import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Create from 'material-ui/svg-icons/content/create';
import Dialog from 'material-ui/Dialog';

import PostEditForm from '../post-edit-form/post-edit-form';
import * as actions from './new-post.actions';

import styles from './new-post.less';

const NewPostContainer = ({ state, postEditor, openDialog, closeDialog, closeErrorDialog, submitPostForm, suggest }) => (
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
            {state.error && (
                <Dialog
                    open onRequestClose={closeErrorDialog}
                    title={`Failed to ${title(suggest).toLowerCase()}`}>
                    {state.error}
                </Dialog>
            )}
        </Dialog>
    </div>
);

NewPostContainer.propTypes = {
    state: React.PropTypes.object,
    postEditor: React.PropTypes.object,
    openDialog: React.PropTypes.func,
    closeDialog: React.PropTypes.func,
    closeErrorDialog: React.PropTypes.func,
    submitPostForm: React.PropTypes.func,
    suggest: React.PropTypes.bool,
};

function title(suggest) {
    return `${suggest ? 'Suggest' : 'Add'} new post`;
}

export default connect(
    state => state.newPost,
    dispatch => bindActionCreators(actions, dispatch)
)(NewPostContainer);
