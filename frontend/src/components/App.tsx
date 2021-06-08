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
import TastingDetails from './TastingDetails'
import UpdateTasting from './UpdateTasting'
import BeveragesList from './BeveragesList'
import CreateBeverage from './CreateBeverage'
import UpdateBeverage from './UpdateBeverage'
import BeverageDetails from './BeverageDetails'
import CategoriesList from './CategoriesList'
import CreateCategory from './CreateCategory'
import UpdateCategory from './UpdateCategory'
import ProducersList from './ProducersList'
import CreateProducer from './CreateProducer'
import UpdateProducer from './UpdateProducer'
import ProducerDetails from './ProducerDetails'
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
    accessToken: string | null
    checkUserAuth: Function
    loadUser: Function
}

// Main component
export function App({
    isAuthenticated,
    accessToken,
    checkUserAuth,
    loadUser,
}: IAppProps) {
    useEffect(() => {
        checkUserAuth(accessToken)
        loadUser(accessToken)
    }, [isAuthenticated, accessToken, checkUserAuth, loadUser])

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <NavigationBar />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/register/" exact component={Register} />
                    <Route path="/login/" exact component={Login} />
                    <Route
                        path="/activate/:userId/:token/"
                        exact
                        component={Activate}
                    />
                    <Route
                        path="/reset-password/"
                        exact
                        component={ResetPassword}
                    />
                    <Route
                        path="/reset-password-confirm/:userId/:token/"
                        exact
                        component={ConfirmResetPassword}
                    />
                    <Route path="/tastings/" exact component={TastingsList} />
                    <Route
                        path="/tastings/create/"
                        exact
                        component={CreateTasting}
                    />
                    <Route
                        path="/tastings/:id/"
                        exact
                        component={TastingDetails}
                    />
                    <Route
                        path="/tastings/:id/update/"
                        exact
                        component={UpdateTasting}
                    />
                    <Route path="/beverages/" exact component={BeveragesList} />
                    <Route
                        path="/beverages/create/"
                        exact
                        component={CreateBeverage}
                    />
                    <Route
                        path="/beverages/:id/"
                        exact
                        component={BeverageDetails}
                    />
                    <Route
                        path="/beverages/:id/update"
                        exact
                        component={UpdateBeverage}
                    />
                    <Route path="/producers/" exact component={ProducersList} />
                    <Route
                        path="/producers/create/"
                        exact
                        component={CreateProducer}
                    />
                    <Route
                        path="/producers/:id/"
                        exact
                        component={ProducerDetails}
                    />
                    <Route
                        path="/producers/:id/update/"
                        exact
                        component={UpdateProducer}
                    />
                    <Route
                        path="/categories/"
                        exact
                        component={CategoriesList}
                    />
                    <Route
                        path="/categories/create/"
                        exact
                        component={CreateCategory}
                    />
                    <Route
                        path="/categories/:id/update/"
                        exact
                        component={UpdateCategory}
                    />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    )
}

// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    accessToken: state.authUser.accessToken,
    tastings: state.tastings.data,
})

export default connect(mapStateToProps, { checkUserAuth, loadUser })(App)

// Theme
const theme = createMuiTheme({
    palette: {
        type: 'light',
        common: {
            black: '#000',
            white: '#fff',
        },
        primary: deepPurple,
        secondary: lime,
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
        },
        warning: {
            light: '#ffb74d',
            main: '#ff9800',
            dark: '#f57c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
            light: '#64b5f6',
            main: '#2196f3',
            dark: '#1976d2',
            contrastText: '#fff',
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        background: {
            paper: '#fff',
            default: '#fafafa',
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
            activatedOpacity: 0.12,
        },
    },
    typography: {
        htmlFontSize: 16,
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
})
