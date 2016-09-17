import * as React from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'material-ui/Tabs';
import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';

import AccountIcon from 'material-ui/svg-icons/action/account-box';
import AdministationIcon from 'material-ui/svg-icons/action/settings';

import AccountSettingsTab from './account-settings.tab';
import AdministrationSettingsTab from './administration-settings.tab';

import { isAdmin } from './../utils/common-utils';

const SettingsPageContainer = ({ account }) => (
    <Card>
        <CardHeader title="Settings" />
        <Tabs>
            <Tab label="Account" icon={<AccountIcon />}>
                <AccountSettingsTab />
            </Tab>
            {
                account && isAdmin(account) && (
                    <Tab label="Administration" icon={<AdministationIcon />}>
                        <AdministrationSettingsTab />
                    </Tab>
                )
            }
        </Tabs>
    </Card>
);

export default connect(({ user }) => user)(SettingsPageContainer);
