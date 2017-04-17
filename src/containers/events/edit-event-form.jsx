import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled from 'styled-components';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';

import DatePicker from 'react-datepicker';
import { Creatable as CreatableSelect } from 'react-select';
import Popup from '../../components/common/popup';
import { allTagsSelector } from './events-reducer';

const Input = styled(Field)`
    display: block;
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
        placeholder="Enter tags..." />
);

const SpeakerSelectField = ({ input: { value, onChange } }) => (
    <CreatableSelect value={value} onChange={onChange} placeholder="Speaker" />
);

const renderTalks = ({ fields: talks }) => (
    <div>
        {talks.map((talk, i) => (
            <fieldset key={i}>
                <legend>Talk {i + 1}</legend>
                <Input name={`${talk}.title`} component="input" placeholder="Title" />
                <Input name={`${talk}.speaker`} component={SpeakerSelectField} />
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
                tags: event.tags && event.map(t => t.value),
                talks: event.talks.map(t => ({
                    ...t,
                    speaker: t.speaker && ({ displayName: t.speaker.value }),
                })),
            }))}>

            <fieldset>
                <legend>Event</legend>
                <Input name="title" component="input" placeholder="Title" />
                <Input name="description" component="input" placeholder="Description" />
                <Input name="image" component="input" placeholder="Image url" />
                <Field name="date" component={DatePickerField} />
                <Input name="location" component="input" placeholder="Location" />
                <Input name="tags" tags={tags} component={TagsSelectField} />
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

export default reduxForm({
    form: 'edit-event',
    initialValues: {
        date: moment().day('Thursday'),
    },
})(
    connect(
        state => ({ tags: allTagsSelector(state) })
    )(EditEventForm)
);
