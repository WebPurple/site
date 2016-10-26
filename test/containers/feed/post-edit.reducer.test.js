import { expect } from 'chai';

import postEditReducer from './../../../src/containers/feed/post-edit-form/post-edit-form.reducer';
import {
    CHANGE_POST_IMAGE,
    toggleDeferredPost,
    toggleExportToFacebook,
    CHANGE_POST_COMMENT,
    RECEIVE_LINK_INFO,
} from './../../../src/containers/feed/post-edit-form/post-edit-form.actions';
import { SUBMIT_POST_FORM } from './../../../src/containers/feed/new-post/new-post.action-types';
import { postAdded } from './../../../src/containers/feed/feed.actions';

describe('post-edit.reducer', () => {
    const state = Object.freeze({});

    it('should create empty post object on init', () => {
        const newState = postEditReducer(undefined, {});
        expect(newState).to.be.defined;
        expect(newState.post).to.be.defined;
        expect(newState.post.text).to.be.defined;
    });

    it('should return old state on unknown action', () => expect(postEditReducer(state, {})).to.equal(state));

    describe('CHANGE_POST_IMAGE action', () => {
        it('should set new image', () => {
            const imageLink = 'awesome image';
            expect(postEditReducer(state, {
                type: CHANGE_POST_IMAGE,
                payload: imageLink,
            }).post.imageLink).to.equal(imageLink);
        });
    });

    describe('DEFERRED_POST action', () => {
        it('should toggle deferredPost', () => {
            const newState = postEditReducer(state, toggleDeferredPost());
            expect(newState.deferredPost).to.equal(true);
            expect(postEditReducer(newState, toggleDeferredPost()).deferredPost).to.equal(false);
        });
    });

    describe('EXPORT_TO_FACEBOOK action', () => {
        it('should set exportToFacebook', () => {
            expect(postEditReducer(state, toggleExportToFacebook(true)).post.exportToFacebook).to.equal(true);
            expect(postEditReducer(state, toggleExportToFacebook(false)).post.exportToFacebook).to.equal(false);
        });
    });

    describe('SUBMIT_POST_FORM action', () => {
        it('should set isFetching to true', () => {
            expect(postEditReducer(state, { type: SUBMIT_POST_FORM }).isFetching).to.equal(true);
        });
    });

    describe('POST_ADDED action', () => {
        it('should clear all post fields and set isFetching to false after post saved', () => {
            const newState = postEditReducer(state, postAdded());
            expect(newState.post).to.deep.equal({ comment: '' });
            expect(newState.isFetching).to.equal(false);
        });
    });

    describe('CHANGE_POST_COMMENT action', () => {
        it('should set new comment', () => {
            const comment = 'awesome comment';
            expect(postEditReducer(state, {
                type: CHANGE_POST_COMMENT,
                payload: comment,
            }).post.comment).to.equal(comment);
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
                .to.eql({
                    comment: 'super comment',
                    field1: 1,
                    field2: 2,
                }));

        it('should set isFetching to false',
            () => expect(newState).to.have.property('isFetching')
                .and.equal(false));
    });
});
