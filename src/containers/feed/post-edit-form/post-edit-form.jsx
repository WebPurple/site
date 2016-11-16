import * as React from 'react';
import { bindActionCreators } from 'redux';
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

import Post from '../../../components/post/post';

import {
    toggleDeferredPost,
    changePostComment,
    toggleExportToFacebook,
    clearSnippet,
} from './post-edit-form.actions';

const PostEditFormContainer = ({
    extended,
    post,
    isFetching,
    onSubmit,
    deferredPost,
    onToggleDeferredPost,
    onToggleExportToFacebook,
    account,
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
        {extended && (
            <CheckBox label="Export to VK" title="Post will be automaticly shared in VK" disabled checked />
        )}
        {extended && (
            <CheckBox
                label="Export to Facebook"
                disabled={!(account && account.fbUserId)}
                checked={post.exportToFacebook}
                onCheck={(e, checked) => onToggleExportToFacebook(checked)} />
        )}
        <br />
        {extended && (
            <Toggle
                label="Deferred post" labelPosition="right"
                disabled
                toggled={deferredPost}
                onToggle={onToggleDeferredPost} />
        )}
        {extended && deferredPost && (
            <DatePicker
                hintText="Post on"
                container="dialog"
                autoOk
                disableYearSelection
                minDate={new Date()}
                disabled={!deferredPost} />
        )}
        {extended && deferredPost && (
            <TimePicker
                hintText="Post at"
                format="24hr"
                autoOk
                disabled={!deferredPost} />
        )}
        <CardActions>
            <RaisedButton
                label="Submit" primary
                disabled={!account || isFetching || !requiredFieldsAreFilled(post)}
                onMouseUp={() => onSubmit(post)} />
        </CardActions>
    </div>
    );

function requiredFieldsAreFilled(post) {
    return post.comment || (post.title && post.description);
}

PostEditFormContainer.propTypes = {
    extended: React.PropTypes.bool,
    post: React.PropTypes.object,
    isFetching: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    deferredPost: React.PropTypes.bool,
    onToggleDeferredPost: React.PropTypes.func,
    onToggleExportToFacebook: React.PropTypes.func,
    account: React.PropTypes.object,
    onChangeComment: React.PropTypes.func,
    onClearSnippet: React.PropTypes.func,
};

export default connect(
    state => ({
        ...state.newPost,
        account: state.user && state.user.account,
    }),
    dispatch => bindActionCreators({
        onToggleDeferredPost: toggleDeferredPost,
        onToggleExportToFacebook: toggleExportToFacebook,
        onChangeComment: changePostComment,
        onClearSnippet: clearSnippet,
    }, dispatch)
)(PostEditFormContainer);
