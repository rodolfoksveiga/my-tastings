// Import components, functions, types, variables, and styles
import TextField from '@material-ui/core/TextField'
import { Field, ErrorMessage } from 'formik'


// Types and interfaces
interface IRegularInputFieldProps {
    input: string
    inputLabel: string
    type?: string
}


// Component
export default function RegularInputField({ input, inputLabel, type='text' }: IRegularInputFieldProps) {
    return (
        <div>
            <Field
                as={TextField}
                type={type}
                name={input}
                id={input}
                label={inputLabel}
                variant='outlined'
                color='primary'
                fullWidth
                margin='dense'
                helperText={<ErrorMessage name={input} />}
            />
        </div>
    )
}
