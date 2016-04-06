import * as React from "react";
import {connect} from "react-redux";

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
var CardActions = require('material-ui/lib/card/card-actions');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');
var CheckBox = require('material-ui/lib/checkbox');
var Toggle = require('material-ui/lib/toggle');
var DatePicker = require('material-ui/lib/date-picker/date-picker');
var TimePicker = require('material-ui/lib/time-picker');

import {IPost} from "../../vo/index";
import {submitPostForm,
    toggleDeferredPost,
    changePostText,
    toggleExportToFacebook,
    changePostImage,
    changePostLink,
    changePostLinkTitle
} from "../../actions/post-edit-form.actions";

const PostEditFormComponent = ({post,
    isFetching,
    onSubmit,
    deferredPost,
    onToggleDeferredPost,
    onToggleExportToFacebook,
    user,
    onChangeLink,
    onChangeText,
    onChangeLinkTitle,
    onChangeImage
    }) => (
    <div>
        <TextField floatingLabelText='What do you want to share with us'
                   hintText='Some link'
                   fullWidth={true}
                   value={post.link}
                   disabled={isFetching}
                   onChange={e => onChangeLink(e.target.value)}/>
        <TextField floatingLabelText='What do you think about it'
                   hintText='Comment'
                   multiLine={true} rows={3} rowsMax={5}
                   fullWidth={true}
                   value={post.text}
                   disabled={isFetching}
                   onChange={e => onChangeText(e.target.value)}/>
        <TextField floatingLabelText='Give us short description of your link'
                   hintText='Link title'
                   fullWidth={true}
                   value={post.linkTitle}
                   disabled={isFetching}
                   onChange={e => onChangeLinkTitle(e.target.value)}/>
        <TextField floatingLabelText='Add some beautiful picture'
                   hintText='Image link'
                   fullWidth={true}
                   value={post.imageLink}
                   disabled={isFetching}
                   onChange={e => onChangeImage(e.target.value)}/>
        <CheckBox label='Export to VK' disabled={true}/>
        <CheckBox label='Export to Facebook'
                  disabled={!(user && user.fbUserId)}
                  checked={post.exportToFacebook}
                  onCheck={(e, checked) => onToggleExportToFacebook(checked)}/>
        <CheckBox label='Export to Twitter' disabled={true}/>
        <br/>
        <Toggle label='Deferred post' labelPosition='right'
                disabled={true}
                toggled={deferredPost}
                onToggle={onToggleDeferredPost}/>
        <DatePicker hintText='Post on'
                    container='dialog'
                    autoOk={true}
                    disableYearSelection={true}
                    minDate={new Date()}
                    disabled={!deferredPost}/>
        <TimePicker hintText='Post at'
                    format="24hr"
                    autoOk={true}
                    disabled={!deferredPost}/>
        <CardActions>
            <RaisedButton label='Submit' primary={true}
                          disabled={!user || isFetching}
                          onMouseUp={onSubmit}/>
        </CardActions>
    </div>
);

const PostEditFormContainer = connect(
    state => Object.assign({}, state.newPost, {user: state.user}),
    (dispatch: Redux.Dispatch, {post}) => {
        return {
            onSubmit: () => dispatch(submitPostForm(post as IPost)),
            onToggleDeferredPost: () => dispatch(toggleDeferredPost()),
            onToggleExportToFacebook: checked => dispatch(toggleExportToFacebook(checked)),
            onChangeLink: newLink => dispatch(changePostLink(newLink)),
            onChangeText: newText => dispatch(changePostText(newText)),
            onChangeLinkTitle: newLinkTitle => dispatch(changePostLinkTitle(newLinkTitle)),
            onChangeImage: newImageLink => dispatch(changePostImage(newImageLink))
        };
    }
)(PostEditFormComponent);

export default PostEditFormContainer;