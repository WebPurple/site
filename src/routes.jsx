import App from './containers/app/app';
import HomePage from './components/home-page/home-page';
import EventsPage from './containers/events/events-page';
import SpeakersPage from './components/speakers-page/speakers-page';

export default [{
    component: App,

    routes: [
// waiting for https://github.com/ReactTraining/react-router/commit/a4b8408cff1f18541f17066dfe90756ed656fb04
//        { path: '/',
//            exact: true,
//            component: HomePage,
//        },
        {
            path: '/home',
            component: HomePage,
        },
        {
            path: '/events',
            component: EventsPage,
        },
        {
            path: '/speakers',
            component: SpeakersPage,
        },
    ],
}];
