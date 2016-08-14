import * as React from 'react';
import { connect } from 'react-redux';

import {
    submitPostForm,
    toggleDeferredPost,
    changePostText,
    toggleExportToFacebook,
    changePostImage,
    changePostLink,
    changePostLinkTitle,
} from '../../actions/post-edit-form.actions';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
const CardActions = require('material-ui/lib/card/card-actions');
const RaisedButton = require('material-ui/lib/raised-button');
const TextField = require('material-ui/lib/text-field');
const CheckBox = require('material-ui/lib/checkbox');
const Toggle = require('material-ui/lib/toggle');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker');

const PostEditFormComponent = ({
    post,
    isFetching,
    onSubmit,
    deferredPost,
    onToggleDeferredPost,
    onToggleExportToFacebook,
    user,
    onChangeLink,
    onChangeText,
    onChangeLinkTitle,
    onChangeImage,
}) => (
    <div>
        <TextField
            floatingLabelText="What do you want to share with us"
            hintText="Some link"
            fullWidth
            value={post.link}
            disabled={isFetching}
            onChange={e => onChangeLink(e.target.value)} />
        <TextField
            floatingLabelText="What do you think about it"
            hintText="Comment"
            multiLine rows={3} rowsMax={5}
            fullWidth
            value={post.text}
            disabled={isFetching}
            onChange={e => onChangeText(e.target.value)} />
        <TextField
            floatingLabelText="Give us short description of your link"
            hintText="Link title"
            fullWidth
            value={post.linkTitle}
            disabled={isFetching}
            onChange={e => onChangeLinkTitle(e.target.value)} />
        <TextField
            floatingLabelText="Add some beautiful picture"
            hintText="Image link"
            fullWidth
            value={post.imageLink}
            disabled={isFetching}
            onChange={e => onChangeImage(e.target.value)} />
        <CheckBox label="Export to VK" disabled />
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
        <DatePicker
            hintText="Post on"
            container="dialog"
            autoOk
            disableYearSelection
            minDate={new Date()}
            disabled={!deferredPost} />
        <TimePicker
            hintText="Post at"
            format="24hr"
            autoOk
            disabled={!deferredPost} />
        <CardActions>
            <RaisedButton
                label="Submit" primary
                disabled={!user || isFetching}
                onMouseUp={onSubmit} />
        </CardActions>
    </div>
    );

const PostEditFormContainer = connect(
    state => Object.assign({}, state.newPost, { user: state.user }),
    (dispatch, { post }) => ({
        onSubmit: () => dispatch(submitPostForm(post)),
        onToggleDeferredPost: () => dispatch(toggleDeferredPost()),
        onToggleExportToFacebook: checked => dispatch(toggleExportToFacebook(checked)),
        onChangeLink: newLink => dispatch(changePostLink(newLink)),
        onChangeText: newText => dispatch(changePostText(newText)),
        onChangeLinkTitle: newLinkTitle => dispatch(changePostLinkTitle(newLinkTitle)),
        onChangeImage: newImageLink => dispatch(changePostImage(newImageLink)),
    })
)(PostEditFormComponent);

export default PostEditFormContainer;
