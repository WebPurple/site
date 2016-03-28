import * as React from 'react';
import {connect} from 'react-redux';

import * as FlatButton from 'material-ui/lib/flat-button';
import * as Dialog from 'material-ui/lib/dialog';

export default class LoginComponent extends React.Component<any, {dialogOpened: boolean}> {

    constructor(props) {
        super(props);
        this.state = {dialogOpened: false};
    }

    render() {
        return (
            <div>
                <FlatButton label="Login" onTouchTap={() => this.setState({dialogOpened: true})}/>
                <Dialog title="Login with"
                        contentStyle={{maxWidth: 500}}
                        open={this.state.dialogOpened}
                        onRequestClose={() => this.setState({dialogOpened: false})}>
                    <FlatButton label="VK" href="auth/vk" linkButton={true}/>
                    <br/>
                    <FlatButton label="Facebook" href="auth/fb" linkButton={true}/>
                </Dialog>
            </div>
        );
    }
}