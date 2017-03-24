import * as React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';

import styles from './navigation-bar.less';

const AppLeftNavComponent = ({ leftNavOpen }) => (
    <Drawer open={leftNavOpen} containerClassName={styles.navigation}>
        <MenuItem leftIcon={<ActionHome />} primaryText="Feed" containerElement={<Link to="/feed" />} />
        <MenuItem leftIcon={<PersonAdd />} primaryText="Suggested" containerElement={<Link to={{ pathname: '/feed', query: { type: 'suggest' } }} />} />
        <MenuItem leftIcon={<Help />} primaryText="About" containerElement={<Link to="/about" />} />
    </Drawer>
);

AppLeftNavComponent.propTypes = {
    leftNavOpen: React.PropTypes.bool,
};

const AppLeftNavContainer = connect(state => state.leftNav)(AppLeftNavComponent);

export default AppLeftNavContainer;
