// Import components, functions, types, variables, and styles
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

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
