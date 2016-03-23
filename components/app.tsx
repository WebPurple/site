import * as React from 'react';
import {render} from 'react-dom';

import AppHeader from './react/app.header';
import PostForm from './react/post.edit.form';
import {getJson} from './utils/ajax';

const App = ({user, post}) => (
    <div className='page'>
        <AppHeader user={user}/>
        <main className='container'>
            <PostForm post={post} onSubmit={() => console.log('onSubmit')}/>
        </main>
    </div>
);

document.addEventListener('DOMContentLoaded', () => getJson('api/user')
    .then((user => render(<App user={user} post={{}}/>, document.getElementById('main')))));
