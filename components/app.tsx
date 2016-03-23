import * as React from 'react';
import {render} from 'react-dom';

import AppHeader from './react/app.header';
import PostForm from './react/post.edit.form';
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

document.addEventListener('DOMContentLoaded', () => getJson('api/user')
    .then((user => render(<App user={user} post={{}}/>, document.getElementById('main'))))
    .catch(err => render(<App user={null} post={{}}/>, document.getElementById('main'))));
