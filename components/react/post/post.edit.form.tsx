import * as React from "react";
import {connect} from "react-redux";

import * as CardActions from "material-ui/lib/card/card-actions";
import * as RaisedButton from "material-ui/lib/raised-button";
import * as TextField from "material-ui/lib/text-field";
import * as CheckBox from "material-ui/lib/checkbox";
import * as Toggle from "material-ui/lib/toggle";
import * as DatePicker from "material-ui/lib/date-picker/date-picker";
import * as TimePicker from "material-ui/lib/time-picker";

import {IPost, IUser} from "../../vo/index";
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
                          disabled={!user || !post.text.trim() || isFetching}
                          onMouseUp={onSubmit}/>
        </CardActions>
    </div>
);

const PostEditFormContainer = connect(
    state => Object.assign({}, state.newPost, {user: state.header.user}),
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