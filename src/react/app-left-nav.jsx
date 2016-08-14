import * as React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// all require's below should be replaced with es6 imports after moving to material-ui 15.x.x
// it caused by this problem: https://github.com/callemall/material-ui/issues/3594
const LeftNav = require('material-ui/lib/left-nav');
const MenuItem = require('material-ui/lib/menus/menu-item');
const ActionHome = require('material-ui/lib/svg-icons/action/home');
const SocialPeople = require('material-ui/lib/svg-icons/social/people');

const AppLeftNavComponent = ({ leftNavOpen, dispatch }) => (
    <LeftNav open={leftNavOpen} className="left-nav">
        <MenuItem leftIcon={<ActionHome />} primaryText="Feed" onTouchTap={() => dispatch(push('/feed'))} />
        <MenuItem leftIcon={<SocialPeople />} primaryText="Users" onTouchTap={() => dispatch(push('/users'))} />
    </LeftNav>
);

const AppLeftNavContainer = connect(state => state.leftNav)(AppLeftNavComponent);

export default AppLeftNavContainer;
