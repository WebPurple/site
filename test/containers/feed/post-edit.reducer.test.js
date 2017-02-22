import deepFreeze from 'deep-freeze';

import postEditReducer from './../../../src/containers/feed/post-edit-form/post-edit-form.reducer';
import {
    CHANGE_POST_IMAGE,
    toggleDeferredPost,
    toggleExportToFacebook,
    CHANGE_POST_COMMENT,
    RECEIVE_LINK_INFO,
    clearSnippet,
} from './../../../src/containers/feed/post-edit-form/post-edit-form.actions';
import { editPost, formSubmitted } from './../../../src/containers/feed/new-post/new-post.actions';
import { postAdded } from './../../../src/containers/feed/feed.actions';

describe('post-edit.reducer', () => {
    const state = Object.freeze({});

    it('should create empty post object on init', () => {
        const newState = postEditReducer(undefined, {});
        expect(newState).toBeDefined();
        expect(newState.post).toBeDefined();
    });

    it('should return old state on unknown action', () => expect(postEditReducer(state, {})).toEqual(state));

    describe('CHANGE_POST_IMAGE action', () => {
        it('should set new image', () => {
            const imageLink = 'awesome image';
            expect(postEditReducer(state, {
                type: CHANGE_POST_IMAGE,
                payload: imageLink,
            }).post.imageLink).toBe(imageLink);
        });
    });

    describe('DEFERRED_POST action', () => {
        it('should toggle deferredPost', () => {
            const newState = postEditReducer(state, toggleDeferredPost());
            expect(newState.deferredPost).toBe(true);
            expect(postEditReducer(newState, toggleDeferredPost()).deferredPost).toEqual(false);
        });
    });

    describe('EXPORT_TO_FACEBOOK action', () => {
        it('should set exportToFacebook', () => {
            expect(postEditReducer(state, toggleExportToFacebook(true)).post.exportToFacebook).toBe(true);
            expect(postEditReducer(state, toggleExportToFacebook(false)).post.exportToFacebook).toBe(false);
        });
    });

    describe('SUBMIT_POST_FORM action', () => {
        it('should set isFetching to true', () => {
            expect(postEditReducer(state, formSubmitted()).isFetching).toBe(true);
        });
    });

    describe('POST_ADDED action', () => {
        it('should clear all post fields and set isFetching to false after post saved', () => {
            const newState = postEditReducer(state, postAdded());
            expect(newState.post).toEqual({ comment: '' });
            expect(newState.isFetching).toBe(false);
        });
    });

    describe('CHANGE_POST_COMMENT action', () => {
        it('should set new comment', () => {
            const comment = 'awesome comment';
            expect(postEditReducer(state, {
                type: CHANGE_POST_COMMENT,
                payload: comment,
            }).post.comment).toBe(comment);
        });
    });

    describe('RECEIVE_LINK_INFO action', () => {
        const fetched = {
            field1: 1,
            field2: 2,
        };
        const oldState = Object.freeze({
            ...state,
            post: {
                comment: 'super comment',
            },
        });

        const newState = postEditReducer(oldState, {
            type: RECEIVE_LINK_INFO,
            payload: fetched,
        });

        it('should extend post object with fetched data',
            () => expect(newState.post)
                .toEqual({
                    comment: 'super comment',
                    field1: 1,
                    field2: 2,
                }));

        it('should set isFetching to false',
            () => expect(newState.isFetching).toBe(false));
    });

    describe('CLEAR_SNIPPET action', () => {
        it('should left only comment', () => {
            const comment = 'comment to left';
            expect(postEditReducer(deepFreeze({
                post: {
                    comment,
                    description: 'to remove',
                    url: 'to remove',
                },
            }), clearSnippet()))
                .toEqual({ post: { comment } });
        });
    });

    describe('EDIT_POST action', () => {
        it('should save copy post object and remove type property', () => {
            const post = { comment: 'new post', type: 'it will be removed' };
            expect(postEditReducer(deepFreeze({ post }), editPost(post)))
                .toEqual({ post: { ...post, type: undefined } });
        });
    });
});
