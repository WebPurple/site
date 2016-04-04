import * as React from 'react';

import {connect} from 'react-redux';
import {push} from 'react-router-redux'

import * as LeftNav from 'material-ui/lib/left-nav';
import * as MenuItem from 'material-ui/lib/menus/menu-item';
import * as ActionHome from 'material-ui/lib/svg-icons/action/home';

const AppLeftNavComponent = ({leftNavOpen, dispatch}) => (
    <LeftNav open={leftNavOpen} className="left-nav">
        <MenuItem leftIcon={<ActionHome/>} primaryText='Feed' focusState='focused' onTouchTap={() => dispatch(push('/feed'))}/>
    </LeftNav>
);

const AppLeftNavContainer = connect(state => state.leftNav)(AppLeftNavComponent);

export default AppLeftNavContainer;