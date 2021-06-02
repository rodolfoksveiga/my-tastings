// Import components, functions, types, variables, and styles
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { deepPurple, lime } from '@material-ui/core/colors'

import NavigationBar from './NavigationBar'
import Home from './Home'
import TastingsList from './TastingsList'
import CreateTasting from './CreateTasting'
import Tasting from './TastingDetails'
import UpdateTasting from './UpdateTasting'
import BeveragesList from './BeveragesList'
import Login from './Login'
import Register from './Register'
import Activate from './Activate'
import ResetPassword from './ResetPassword'
import ConfirmResetPassword from './ConfirmResetPassword'
import checkUserAuth from '../actions/checkUserAuth'
import loadUser from '../actions/loadUser'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
interface IAppProps {
    isAuthenticated: boolean
    access: string | null
    checkUserAuth: Function
    loadUser: Function
}


// Main component
export function App({ isAuthenticated, access, checkUserAuth, loadUser }: IAppProps) {
    useEffect(() => {
        checkUserAuth(access)
        loadUser(access)
    }, [isAuthenticated, access, checkUserAuth, loadUser])

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <NavigationBar />
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/register/' exact component={Register} />
                    <Route path='/login/' exact component={Login} />
                    <Route path='/activate/:userId/:token/' exact component={Activate} />
                    <Route path='/reset-password/' exact component={ResetPassword} />
                    <Route path='/reset-password-confirm/:userId/:token/' exact component={ConfirmResetPassword} />
                    <Route path='/tastings/' exact component={TastingsList} />
                    <Route path='/tastings/create/' exact component={CreateTasting} />
                    <Route path='/tastings/:id/' exact component={Tasting} />
                    <Route path='/tastings/:id/update/' exact component={UpdateTasting} />
                    <Route path='/beverages/' exact component={BeveragesList} />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    access: state.authUser.access,
    tastings: state.tastings.data
})

export default connect(mapStateToProps, { checkUserAuth, loadUser })(App)


// Theme
const theme = createMuiTheme({
    palette: {
        type: 'light',
        common: {
            black: '#000',
            white: '#fff'
        },
        primary: {
            light: deepPurple[200],
            main: deepPurple[500],
            dark: deepPurple[800],
            contrastText: '#fff'
        },
        secondary: {
            light: lime[200],
            main: lime[500],
            dark: lime[800],
            contrastText: '#fff'
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff'
        },
        warning: {
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        info: {
            light: '#64b5f6',
            main: '#2196f3',
            dark: '#1976d2',
            contrastText: '#fff'
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: 'rgba(0, 0, 0, 0.87)'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)'
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        background: {
            paper: '#fff',
            default: '#fafafa'
        },
        action: {
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            hoverOpacity: 0.04,
            selected: 'rgba(0, 0, 0, 0.08)',
            selectedOpacity: 0.08,
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            disabledOpacity: 0.38,
            focus: 'rgba(0, 0, 0, 0.12)',
            focusOpacity: 0.12,
            activatedOpacity: 0.12
        }
    },
    typography: {
        htmlFontSize: 16,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
    }
})