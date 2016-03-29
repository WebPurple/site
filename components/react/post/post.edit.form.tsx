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
import {submitPostForm, toggleDeferredPost, changePostText} from "../../actions/post-edit-form.actions";
import {toggleExportToFacebook} from "../../actions/post-edit-form.actions";

export interface PostEditFormProps {
    user: IUser
    post: IPost;
    isFetching: boolean;
    onSubmit: any;
    deferredPost?: boolean;
    onToggleDeferredPost: Function;
    onChangeText: React.FormEventHandler;
}

const PostEditFormComponent = ({post, isFetching, onSubmit, deferredPost, onToggleDeferredPost, onChangeText, onToggleExportToFacebook, user}: PostEditFormProps) => (
    <div>
        <TextField floatingLabelText='Tell us something interesting'
                   multiLine={true}
                   rows={3} rowsMax={5} fullWidth={true}
                   value={post.text}
                   disabled={isFetching}
                   onChange={e => onChangeText(e.target.value)}/>
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
            onSubmit: () => dispatch(submitPostForm(post)),
            onToggleDeferredPost: () => dispatch(toggleDeferredPost()),
            onChangeText: (newText) => dispatch(changePostText(newText)),
            onToggleExportToFacebook: (checked) => dispatch(toggleExportToFacebook(checked))
        };
    }
)(PostEditFormComponent);

export default PostEditFormContainer;