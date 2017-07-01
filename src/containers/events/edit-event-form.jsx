import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { objOf, path, pipe } from 'ramda';
import { compose } from 'recompose';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled from 'styled-components';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';

import DatePicker from 'react-datepicker';
import { Creatable as CreatableSelect, AsyncCreatable as AsyncCreatableSelect } from 'react-select';
import Popup from '../../components/common/popup';
import { allTagsSelector } from './events-reducer';
import { getJson } from '../../utils/ajax';

const FormInput = styled(Field)`
    display: block;
    border: none;
    border-bottom: 1px solid ${path(['theme', 'warmGrey'])};
    font-family: Oxygen, sans-serif;
    font-size: 1.8em;
    padding: .5em;
    margin: .5em;
    outline: none;
    
    &:focus {
        border-bottom-color: ${path(['theme', 'lipstick'])};
    }
`;

const DatePickerField = ({ input: { value, onChange } }) => (
    <DatePicker selected={value} onChange={onChange} />
);

const TagsSelectField = ({ input: { value, onChange }, tags }) => (
    <CreatableSelect
        options={tags.map(t => ({ value: t, label: t }))}
        value={value}
        onChange={onChange}
        multi
        promptTextCreator={tag => `Create tag "${tag}"`}
        placeholder="Enter tags..." />
);

const SpeakerSelectField = ({ input: { value, onChange } }) => (
    <AsyncCreatableSelect
        value={value}
        onChange={onChange}
        loadOptions={() => getJson('/api/users').then(options => ({ options }))/* TODO: prevent multiple requests */}
        valueKey="_id"
        labelKey="displayName"
        promptTextCreator={userName => `Create user "${userName}"`}
        newOptionCreator={({ label, labelKey, valueKey }) => ({ [labelKey]: label, [valueKey]: -1 })}
        placeholder="Speaker" />
);

/* eslint-disable react/no-array-index-key */
const renderTalks = ({ fields: talks }) => (
    <div>
        {talks.map((talk, i) => (
            <fieldset key={i}>
                <legend>Talk {i + 1}</legend>
                <FormInput name={`${talk}.title`} required component="input" placeholder="Title" />
                <FormInput name={`${talk}.speaker`} component={SpeakerSelectField} />
            </fieldset>
        ))}
        <button type="button" onClick={() => talks.push({})}>Add talk</button>
    </div>
);

const EditEventForm = ({ onSubmit, handleSubmit, onRequestClose, tags }) => (
    <Popup isOpen contentLabel="Add new event" onRequestClose={onRequestClose}>
        <form
            onSubmit={handleSubmit(event => onSubmit({
                ...event,
                tags: event.tags && event.tags.map(t => t.value),
            }))}>

            <fieldset>
                <legend>Event</legend>
                <FormInput name="title" required component="input" placeholder="Title" />
                <FormInput name="description" required component="input" placeholder="Description" />
                <FormInput name="image" component="input" placeholder="Image url" />
                <Field name="date" component={DatePickerField} />
                <FormInput name="location" required component="input" placeholder="Location" />
                <Field name="tags" tags={tags} component={TagsSelectField} />
            </fieldset>

            <FieldArray name="talks" component={renderTalks} />

            <button type="submit">Add event</button>
        </form>
    </Popup>
);

EditEventForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
};

export default compose(
    reduxForm({
        form: 'edit-event',
        initialValues: {
            date: moment().day('Thursday'),
        },
    }),
    connect(pipe(allTagsSelector, objOf('tags'))),
)(EditEventForm);
