import * as React from "react";
import {connect} from "react-redux";

import * as CardActions from "material-ui/lib/card/card-actions";
import * as RaisedButton from "material-ui/lib/raised-button";
import * as TextField from "material-ui/lib/text-field";
import * as CheckBox from "material-ui/lib/checkbox";
import * as Toggle from "material-ui/lib/toggle";
import * as DatePicker from "material-ui/lib/date-picker/date-picker";
import * as TimePicker from "material-ui/lib/time-picker";

import {IPost} from "../../vo/index";
import {submitPostForm, toggleDeferredPost, changePostText} from "../../actions/post-edit-form.actions";

export interface PostEditFormProps {
    post: IPost;
    onSubmit: any;
    deferredPost?: boolean;
    onToggleDeferredPost: Function;
    onTitleChange: React.FormEventHandler;
    onChangeText: React.FormEventHandler;
}

const PostEditFormComponent = ({post, isFetching, onSubmit, deferredPost, onToggleDeferredPost, onChangeText}: PostEditFormProps) => (
    <div>
        <TextField floatingLabelText='Tell us something interesting'
                   multiLine={true}
                   rows={3} rowsMax={5} fullWidth={true}
                   value={post.text}
                   disabled={isFetching}
                   onChange={e => onChangeText(e.target.value)}/>
        <CheckBox label='Export to VK'/>
        <CheckBox label='Export to Facebook'/>
        <CheckBox label='Export to Twitter'/>
        <br/>
        <Toggle label='Deferred post' labelPosition='right'
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
                          disabled={!post.text.trim() || isFetching}
                          onMouseUp={onSubmit}/>
        </CardActions>
    </div>
);

const PostEditFormContainer = connect(
    state => state.newPost,
    (dispatch: Redux.Dispatch, {post}) => {
        return {
            onSubmit: () => dispatch(submitPostForm(post)),
            onToggleDeferredPost: () => dispatch(toggleDeferredPost()),
            onChangeText: (newText) => dispatch(changePostText(newText))
        };
    }
)(PostEditFormComponent);

export default PostEditFormContainer;