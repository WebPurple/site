import * as React from "react";

import Card from "material-ui/lib/card/card";
import CardHeader from "material-ui/lib/card/card-header";
import CardText from "material-ui/lib/card/card-text";
import CardActions from "material-ui/lib/card/card-actions";
import RaisedButton from "material-ui/lib/raised-button";
import TextField from "material-ui/lib/text-field";
import CheckBox from "material-ui/lib/checkbox";
import Toggle from "material-ui/lib/toggle";
import DatePicker from "material-ui/lib/date-picker/date-picker";

interface PostVO {
    title: string;
    text: string;
}

export interface PostEditFormProps {
    post: PostVO;
    onSubmit: any;
    deferredPost?: boolean;
    onToggleDeferredPost?: (isInputChecked: boolean) => void;
}

const PostEditForm = ({post, onSubmit, deferredPost, onToggleDeferredPost}: PostEditFormProps) => (
    <Card>
        <CardHeader title='New post'/>
        <CardText>
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
                    onToggle={(e, isInputChecked) => onToggleDeferredPost(isInputChecked)}/>
            <DatePicker hintText='Post on'
                        container='dialog'
                        mode='landscape'
                        autoOk={true}
                        disableYearSelection={true}
                        maxDate={new Date()}
                        disabled={!deferredPost}/>
        </CardText>
        <CardActions>
            <RaisedButton label='Submit' primary={true} onMouseUp={onSubmit}/>
        </CardActions>
    </Card>
);

export default PostEditForm;