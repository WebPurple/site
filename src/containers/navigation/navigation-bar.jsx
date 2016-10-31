import * as React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';

import styles from './navigation-bar.less';

const AppLeftNavComponent = ({ leftNavOpen, dispatch }) => (
    <Drawer open={leftNavOpen} containerClassName={styles.navigation}>
        <MenuItem leftIcon={<ActionHome />} primaryText="Feed" onTouchTap={() => dispatch(push('/feed'))} />
        <MenuItem leftIcon={<PersonAdd />} primaryText="Suggested" onTouchTap={() => dispatch(push({ pathname: '/feed', query: { type: 'suggest' } }))} />
        <MenuItem leftIcon={<Help />} primaryText="About" onTouchTap={() => dispatch(push('/about'))} />
    </Drawer>
);

const AppLeftNavContainer = connect(state => state.leftNav)(AppLeftNavComponent);

export default AppLeftNavContainer;
