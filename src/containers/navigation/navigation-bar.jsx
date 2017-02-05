import * as React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';

import styles from './navigation-bar.less';

const AppLeftNavComponent = ({ leftNavOpen, isAuthorized }) => (
    <Drawer open={leftNavOpen} containerClassName={styles.navigation}>
        <MenuItem leftIcon={<ActionHome />} primaryText="Feed" containerElement={<Link to="/feed" />} />
        {isAuthorized && (
            <MenuItem
                leftIcon={<PersonAdd />}
                primaryText="Suggested"
                containerElement={<Link to={{ pathname: '/feed', query: { type: 'suggest' } }} />} />
        )}
        <MenuItem leftIcon={<Help />} primaryText="About" containerElement={<Link to="/about" />} />
    </Drawer>
);

AppLeftNavComponent.propTypes = {
    leftNavOpen: React.PropTypes.bool,
    isAuthorized: React.PropTypes.bool
};

const AppLeftNavContainer = connect(state => ({
    leftNavOpen: state.leftNav.leftNavOpen,
    isAuthorized: state.user.isAuthorized
}))(AppLeftNavComponent);

export default AppLeftNavContainer;
