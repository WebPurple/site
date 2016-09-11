import * as React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import Help from 'material-ui/svg-icons/action/help';

const AppLeftNavComponent = ({ leftNavOpen, dispatch }) => (
    <Drawer open={leftNavOpen} containerClassName="left-nav">
        <MenuItem leftIcon={<ActionHome />} primaryText="Feed" onTouchTap={() => dispatch(push('/feed'))} />
        <MenuItem leftIcon={<Help />} primaryText="About" onTouchTap={() => dispatch(push('/about'))} />
    </Drawer>
);

const AppLeftNavContainer = connect(state => state.leftNav)(AppLeftNavComponent);

export default AppLeftNavContainer;
