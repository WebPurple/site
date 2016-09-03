import * as React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialogOpened: false };
    }

    render() {
        return (
            <div>
                <FlatButton label="Login" onTouchTap={() => this.setState({ dialogOpened: true })} />
                <Dialog
                    title="Login with"
                    contentStyle={{ maxWidth: 500 }}
                    open={this.state.dialogOpened}
                    onRequestClose={() => this.setState({ dialogOpened: false })}>
                    <FlatButton label="VK" href="auth/vk" linkButton />
                    <br />
                    <FlatButton label="Facebook" href="auth/fb" linkButton />
                </Dialog>
            </div>
        );
    }
}
