import * as React from 'react';
import {render} from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import AppHeader from './react/app.header';
import Feed from './react/feed';
import {getJson} from './utils/ajax';

const App = ({user, post}) => (
    <div className='page'>
        <AppHeader user={user}/>
        <main className='container'>
            <Feed/>
        </main>
    </div>
);

injectTapEventPlugin();

document.addEventListener('DOMContentLoaded', () => getJson('api/user')
    .then(user => render(<App user={user} post={{}}/>, document.getElementById('main')))
    .catch(err => render(<App user={null} post={{}}/>, document.getElementById('main'))));
