import * as React from "react";
import {connect} from "react-redux";

import CardActions from "material-ui/lib/card/card-actions";
import RaisedButton from "material-ui/lib/raised-button";
import TextField from "material-ui/lib/text-field";
import CheckBox from "material-ui/lib/checkbox";
import Toggle from "material-ui/lib/toggle";
import DatePicker from "material-ui/lib/date-picker/date-picker";

import {IPost} from "../../vo/index";
import {submitPostForm, toggleDeferredPost} from "../../actions/post-edit-form.actions";

export interface PostEditFormProps {
    post: IPost;
    onSubmit: any;
    deferredPost?: boolean;
    onToggleDeferredPost: Function;
}

let PostEditForm = ({post, onSubmit, deferredPost, onToggleDeferredPost}: PostEditFormProps) => (
    <div>
        <TextField floatingLabelText='Title' fullWidth={true} value={post.title}/>
        <TextField floatingLabelText='Text'
                   multiLine={true}
                   rows={3} rowsMax={5} fullWidth={true}
                   value={post.text}/>
        <CheckBox label='Export to VK'/>
        <CheckBox label='Export to Facebook'/>
        <CheckBox label='Export to Twitter'/>
        <br/>
        <Toggle title='Deferred post' labelPosition='right'
                toggled={deferredPost}
                onToggle={onToggleDeferredPost}/>
        <DatePicker hintText='Post on'
                    container='dialog'
                    mode='landscape'
                    autoOk={true}
                    disableYearSelection={true}
                    maxDate={new Date()}
                    disabled={!deferredPost}/>
        <CardActions>
            <RaisedButton label='Submit' primary={true} onMouseUp={onSubmit}/>
        </CardActions>
    </div>
);

PostEditForm = connect(
    state => state.newPost,
    (dispatch: Redux.Dispatch, {post}) => {
        return {
            onSubmit: () => dispatch(submitPostForm(post)),
            onToggleDeferredPost: () => dispatch(toggleDeferredPost())
        };
    }
)(PostEditForm);

export default PostEditForm;