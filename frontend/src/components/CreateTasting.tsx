// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikTasting from './FormikTasting'
import createTasting from '../actions/createTasting'


// Types and interfaces
export interface ITastingForm {
    id?: string
    modified_at?: string
    name: string
    beverage: number
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number
    user: number
}

export interface ITastingFormFake {
    id?: string
    modified_at?: string
    name: string
    beverage?: number
    beverageName: string
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number
    user?: number
    userName?: string
}

interface ICreateTastingProps {
    createTasting: Function
}


// Global variables
const initialTastingForm: ITastingFormFake = {
    name: '',
    beverageName: '',
    color: '',
    appearance: '',
    aroma: '',
    finish: '',
    rating: 5
}


// Main component
export function CreateTasting({ createTasting }: ICreateTastingProps) {
    const history = useHistory()

    function handleCreate(formData: ITastingForm, userId: number) {
        formData.user = userId
        createTasting(formData)
        history.push('/tastings/')
    }

    return (
        <div>
            <Grid
                container
                direction='column'
                justify='flex-start'
                spacing={3}
                alignItems='center'
            >
                <Grid
                    item
                >
                    <h2>Create Tasting</h2>
                </Grid>
                <FormikTasting
                    initialFormData={initialTastingForm}
                    handleSubmit={handleCreate} 
                />
                <Grid
                    item
                >
                    <Button
                        variant='outlined'
                        href='/tastings/'
                        startIcon={<ArrowBackOutlinedIcon />}
                        fullWidth
                    >
                        Back to Tastings List
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}


// Connect to Redux
export default connect(null, { createTasting })(CreateTasting)
