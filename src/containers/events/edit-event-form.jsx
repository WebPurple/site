import React, { PropTypes } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled from 'styled-components';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-select/dist/react-select.css';

import DatePicker from 'react-datepicker';
import { Creatable as CreatableSelect } from 'react-select';
import Popup from '../../components/common/popup';

const Input = styled(Field)`
    display: block;
`;

const preprocess = event => ({
    ...event,
    tags: event.tags && event.map(t => t.value),
});

const DatePickerField = ({ input: { value, onChange } }) => (
    <DatePicker selected={value} onChange={onChange} />
);

const SelectField = ({ input: { value, onChange } }) => (
    <CreatableSelect multi placeholder="Enter tags..." value={value} onChange={onChange} />
);

const renderTalks = ({ fields: talks }) => (
    <div>
        {talks.map((talk, i) => (
            <fieldset key={i}>
                <legend>Talk {i + 1}</legend>
                <Input name={`${talk}.title`} component="input" placeholder="Title" />
                <Input name={`${talk}.speaker`} component="input" placeholder="Speaker" />
            </fieldset>
        ))}
        <button type="button" onClick={() => talks.push({})}>Add talk</button>
    </div>
);

const EditEventForm = ({ onSubmit, handleSubmit, onRequestClose }) => (
    <Popup isOpen contentLabel="Add new event" onRequestClose={onRequestClose}>
        <form onSubmit={handleSubmit(event => onSubmit(preprocess(event)))}>
            <fieldset>
                <legend>Event</legend>
                <Input name="title" component="input" placeholder="Title" />
                <Input name="description" component="input" placeholder="Description" />
                <Input name="image" component="input" placeholder="Image url" />
                <Field name="date" component={DatePickerField} />
                <Input name="location" component="input" placeholder="Location" />
                <Input name="tags" component={SelectField} />
            </fieldset>
            <FieldArray
                name="talks"
                component={renderTalks} />
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
})(EditEventForm);
