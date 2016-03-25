import * as React from "react";
import {connect} from "react-redux";

import * as CardActions from "material-ui/lib/card/card-actions";
import * as RaisedButton from "material-ui/lib/raised-button";
import * as TextField from "material-ui/lib/text-field";
import * as CheckBox from "material-ui/lib/checkbox";
import * as Toggle from "material-ui/lib/toggle";
import * as DatePicker from "material-ui/lib/date-picker/date-picker";

import {IPost} from "../../vo/index";
import {
    submitPostForm, toggleDeferredPost, changePostTitle,
    changePostText
} from "../../actions/post-edit-form.actions";

export interface PostEditFormProps {
    post: IPost;
    onSubmit: any;
    deferredPost?: boolean;
    onToggleDeferredPost: Function;
    onTitleChange: React.FormEventHandler;
    onChangeText: React.FormEventHandler;
}

const PostEditFormComponent = ({post, isFetching, onSubmit, deferredPost, onToggleDeferredPost, onTitleChange, onChangeText}: PostEditFormProps) => (
    <div>
        <TextField floatingLabelText='Title' fullWidth={true}
                   value={post.title}
                   disabled={isFetching}
                   onChange={e => onTitleChange(e.target.value)}/>
        <TextField floatingLabelText='Text'
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
                    maxDate={new Date()}
                    disabled={!deferredPost}/>
        <CardActions>
            <RaisedButton label='Submit' primary={true}
                          disabled={!post.title || !post.text || isFetching}
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
            onTitleChange: (newTitle) => dispatch(changePostTitle(newTitle)),
            onChangeText: (newText) => dispatch(changePostText(newText))
        };
    }
)(PostEditFormComponent);

export default PostEditFormContainer;