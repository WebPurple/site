import React from 'react';

import SubscriptionForm from '../subscription-form/subscription-form';
import EventsFeed from './events-feed';

export default function EventsPage() {
    return (
        <div>
            <SubscriptionForm />
            <EventsFeed />
        </div>
    );
}
