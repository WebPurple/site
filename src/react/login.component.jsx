import * as React from 'react';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/dialog');

export default class LoginComponent extends React.Component {

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