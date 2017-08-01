import App from './containers/app/app';
import HomePage from './containers/home-page/home-page';
import EventsPage from './containers/events/events-page';
import SpeakersPage from './containers/speakers/speakers-page';
import ContributorsPage from './containers/contributors/contributors-page';
import EventPageContainer from './containers/events/event-page';
import NotFoundPage from './components/common/not-found';

export default [{
    component: App,

    routes: [
        {
            path: '/',
            exact: true,
            component: HomePage,
        },
        {
            path: '/events',
            component: EventsPage,
        },
        {
            path: '/event/:eventId',
            component: EventPageContainer,
        },
        {
            path: '/speakers',
            component: SpeakersPage,
        },
        {
            path: '/contributors',
            component: ContributorsPage,
        },
        {
            path: '**',
            component: NotFoundPage,
        },
    ],
}];
