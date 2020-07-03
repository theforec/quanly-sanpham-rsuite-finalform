import React from 'react'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}
const FieldArrays = () => {
    return (
        <Form
            onSubmit={onSubmit}
            mutators={{
                // potentially other mutators could be merged here
                ...arrayMutators
            }}
            // validate={validate}
            render={({ handleSubmit, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                    <FieldArray name="fieldsArray">
                        {({ fields }) => (
                            <div>
                                {fields.map((name, index) => (
                                    <div key={name}>
                                        <div>
                                            <label>First Name</label>
                                            <Field name={`${name}.firstName`} component="input" />
                                        </div>
                                        <div>
                                            <label>Last Name</label>
                                            <Field name={`${name}.lastName`} component="input" />
                                        </div>
                                        <button type="button" onClick={() => fields.remove(index)}
                                        > Remove</button>
                                    </div>
                                ))}
                                <button type="button"
                                    onClick={() => fields.push({ firstName: '', lastName: '' })}
                                >  Add </button>

                                <pre>{JSON.stringify(fields, undefined, 2)}</pre>
                            </div>
                        )}
                    </FieldArray>
                </form>
            )}
        />
    );
}

export default FieldArrays;