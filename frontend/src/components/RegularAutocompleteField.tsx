// Import components, functions, types, variables, and styles
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

import { ITasting, TTastings } from './TastingsList'
import { IProducer, TProducers } from './ProducersList'
import { ICategory, TCategories } from './CategoriesList'


// Types and interfaces
interface IRegularAutocompleteField {
    input: string
    inputLabel: string
    initialValue: ITasting | IProducer | ICategory | undefined
    options: TTastings | TProducers | TCategories
    setFieldValue: Function
}


// Component
export default function RegularAutocompleteField({
    input,
    inputLabel,
    initialValue,
    options,
    setFieldValue
}: IRegularAutocompleteField) {
    return (
        <Autocomplete
            freeSolo
            value={initialValue}
            options={options}
            getOptionLabel={option => option.name}
            onChange={(e, value) => {
                setFieldValue(
                    input,
                    value !== null && typeof value !== 'string' ? value.id : null
                )
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    label={inputLabel}
                    variant='outlined'
                    margin='dense'
                    fullWidth
                    />
            )}
        />
    )
}
