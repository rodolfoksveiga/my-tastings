// Import components, functions, types, variables, and styles
import TextField from '@material-ui/core/TextField'
import { Field, ErrorMessage } from 'formik'

import { IInputFieldProps } from '../types'


// Component
export default function InputField({ input, type='text' }: IInputFieldProps) {
    const capitalizedInput = input.replace(/^\w/, w => w.toUpperCase())

    return (
        <div>
            <Field
                as={TextField}
                type={type}
                name={input}
                id={input}
                label={capitalizedInput}
                variant='outlined'
                color='primary'
                fullWidth
                margin='dense'
                helperText={<ErrorMessage name={input} />}
            />
        </div>
    )
}
