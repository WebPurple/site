import React from 'react';

import PastEvents from '../../containers/events/past-events';

import SubscriptionForm from '../subscription-form/subscription-form';
import SocialLinks from './social-links-block';
import UpcomingEvents from './upcoming-events-block';

const HomePage = () => (
    <div>
        <UpcomingEvents
            event={{
                location: 'Karas` Bar, Pochtovaya str., 60',
                date: '21 January 2017 at 19:00',
                talks: [{ title: 'What is React Native', speaker: 'Andrey Semin' },
                    { title: 'Level Up By Community Growth-Hacking', speaker: 'Lois Graham' },
                ],
            }} />
        <PastEvents />
        <SubscriptionForm />
        <SocialLinks />
    </div>
);

export default HomePage;
