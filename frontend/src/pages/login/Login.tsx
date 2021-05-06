import {useState} from 'react'
import '../../components/App'

interface ILoginTabsProps {}

const LoginTabs: React.FunctionComponent<ILoginTabsProps> = (props) => {
    const [toggleTab, setToggleTab] = useState<number>(1)

    function handleToggleTab(index: number) {
        setToggleTab(index)
    }

    return (
        <div className='session-container'>
            <div className='session-tabs-header'>
                <div className={
                    toggleTab === 1
                    ? 'session-tab session-active-tab'
                    : 'session-tab'
                } onClick={
                    () => handleToggleTab(1)
                }>
                    Sign in
                </div>

                <div className={
                    toggleTab === 2
                    ? 'session-tab session-active-tab'
                    : 'session-tab'
                } onClick={
                    () => handleToggleTab(2)
                }>
                    Sign up
                </div>
            </div>

            <div className='session-tabs-content'>
                <div className={
                    toggleTab === 1
                    ? 'session-content session-active-content'
                    : 'session-content'
                } onClick={
                    () => handleToggleTab(1)
                }>
                    FORM TO SIGN IN
                </div>

                <div className={
                    toggleTab === 2
                    ? 'session-content session-active-content'
                    : 'session-content'
                } onClick={
                    () => handleToggleTab(2)
                }>
                    FORM TO SIGN UP
                </div>
            </div>
        </div>
    )
}

export default LoginTabs