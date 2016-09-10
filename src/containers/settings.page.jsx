import * as React from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';

import AccountSettingsTab from './account-settings.tab';
import AdministrationSettingsTab from './administration-settings.tab';

import { isAdmin } from './../utils/common-utils';

const SettingsPageContainer = ({ account }) => (
    <Card>
        <CardHeader title="Settings" />
        <Tabs>
            <Tab label="Account">
                <AccountSettingsTab />
            </Tab>
            {
                account && isAdmin(account) && (
                    <Tab label="Administration">
                        <AdministrationSettingsTab />
                    </Tab>
                )
            }
        </Tabs>
    </Card>
);

export default connect(({ user }) => user)(SettingsPageContainer);
