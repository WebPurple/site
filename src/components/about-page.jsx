import * as React from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import VkWidget from './vk-community-widget';

const AboutPage = () => (
    <div>
        <Card>
            <CardTitle title="Webpurple" />
            <CardText>Webpurple is a Ryazan front-end community...</CardText>
        </Card>
        <div style={{ paddingTop: 20 }}>
            <VkWidget />
        </div>
    </div>
);

export default AboutPage;
