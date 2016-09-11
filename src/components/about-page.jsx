import * as React from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import VkWidget from './social/vk-community-widget';
import FbWidget from './social/fb-community-widget';

const AboutPage = () => (
    <div>
        <Card>
            <CardTitle title="Webpurple" />
            <CardText>Webpurple is a Ryazan front-end community...</CardText>
        </Card>
        <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: 0, paddingTop: 20 }}>
            <li><VkWidget height={170} width={400} /></li>
            <li><FbWidget /></li>
        </ul>
    </div>
);

export default AboutPage;
