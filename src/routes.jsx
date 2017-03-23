import App from './containers/app/app';

const loadModule = cb => module => cb(null, module.default);

const handleError = err => console.error(`Failed to load route component: ${err}`);

export default {

    path: '/',

    component: App,

    getIndexRoute(partialNextState, cb) {
        import('./components/home-page/home-page')
            .then(module => cb(null, { component: module.default }))
            .catch(handleError)
    },

    childRoutes: [
        {
            path: 'home',

            getComponents(nextState, cb) {
                import('./components/home-page/home-page')
                    .then(loadModule(cb))
                    .catch(handleError)
            },
        },
        {
            path: 'events',

            getComponents(nextState, cb) {
                import('./components/events-page/events-page')
                    .then(loadModule(cb))
                    .catch(handleError)
            },
        },
    ],

};
