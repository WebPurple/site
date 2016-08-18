import * as React from 'react';
import { connect } from 'react-redux';

import CardActions from 'material-ui/Card/CardActions';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CheckBox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import LinearProgress from 'material-ui/LinearProgress';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

import Post from '../post';

import {
    submitPostForm,
    toggleDeferredPost,
    changePostComment,
    toggleExportToFacebook,
    clearSnippet,
} from '../../actions/post-edit-form.actions';

const PostEditFormComponent = ({
    post,
    isFetching,
    onSubmit,
    deferredPost,
    onToggleDeferredPost,
    onToggleExportToFacebook,
    user,
    onChangeComment,
    onClearSnippet,
}) => (
    <div>
        {isFetching && <LinearProgress mode="indeterminate" />}
        <TextField
            floatingLabelText="What do you want to share with us"
            hintText="Some link and maybe your thoughts about it"
            fullWidth
            value={post.comment}
            disabled={isFetching}
            onChange={e => onChangeComment(e.target.value)} />
        {post.url && (
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <Post {...post} comment="" />
                <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onTouchTap={onClearSnippet}>
                    <Close />
                </IconButton>
            </div>
        )}
        <CheckBox label="Export to VK" title={'Post will be automaticly shared in VK'} disabled checked />
        <CheckBox
            label="Export to Facebook"
            disabled={!(user && user.fbUserId)}
            checked={post.exportToFacebook}
            onCheck={(e, checked) => onToggleExportToFacebook(checked)} />
        <CheckBox label="Export to Twitter" disabled />
        <br />
        <Toggle
            label="Deferred post" labelPosition="right"
            disabled
            toggled={deferredPost}
            onToggle={onToggleDeferredPost} />
        {
            deferredPost && <DatePicker
                hintText="Post on"
                container="dialog"
                autoOk
                disableYearSelection
                minDate={new Date()}
                disabled={!deferredPost} />
        }
        {
            deferredPost && <TimePicker
                hintText="Post at"
                format="24hr"
                autoOk
                disabled={!deferredPost} />
        }
        <CardActions>
            <RaisedButton
                label="Submit" primary
                disabled={!user || isFetching || !requiredFieldsAreFilled(post)}
                onMouseUp={onSubmit} />
        </CardActions>
    </div>
    );

function requiredFieldsAreFilled(post) {
    return post.comment || (post.title && post.description);
}

const PostEditFormContainer = connect(
    state => Object.assign({}, state.newPost, { user: state.user }),
    (dispatch, { post }) => ({
        onSubmit: () => dispatch(submitPostForm(post)),
        onToggleDeferredPost: () => dispatch(toggleDeferredPost()),
        onToggleExportToFacebook: checked => dispatch(toggleExportToFacebook(checked)),
        onChangeComment: newText => dispatch(changePostComment(newText)),
        onClearSnippet: () => dispatch(clearSnippet()),
    })
)(PostEditFormComponent);

export default PostEditFormContainer;
