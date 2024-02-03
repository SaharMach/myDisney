import { useState } from 'react'
// import { login, signup } from '../store/actions/user.actions'
import { useNavigate } from 'react-router'
import { signup, login } from '../store/user.actions.js'
export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onConnect() {
        event.preventDefault()
        try {
            if (!isSignup) {
                if (!credentials.username) return
                const user = await login(credentials)
                if (user) {
                    navigate('/')
                    clearState()
                }
            } else {
                if (!credentials.username || !credentials.password || !credentials.fullname) return
                const user = await signup(credentials)
                console.log(user);
                if (user) {
                    navigate('/')
                    clearState()
                }

            }
        } catch (err) {
            console.log('Could not set user', err)
        }
    }

    async function onConnectAsAUser() {
        try {
            await login({ username: 'Guest', password: "1234" })
            // navigate('/workspace')
        } catch (err) {
            console.log('Could not connect as a guest', err);
        }
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    // function onUploaded(imgUrl) {
    //     setCredentials({ ...credentials, imgUrl })
    // }

    return (
        <div className="login-page-container flex justify-center">
            <div className='login-page'>
                <div className='login-page-titles'>
                    <p className='logo'>PDT</p>
                    <p className='welcome-title'>{isSignup ? 'Sign up' : 'Log in'} to continue</p>
                </div>
                <form className="login-page-form" onSubmit={onConnect}>
                    <input
                        type="text"
                        name="username"
                        // value={username}
                        placeholder="Enter username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        // value={password}
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />
                    {isSignup &&
                        (
                            <>
                                <input
                                    type="text"
                                    name="fullname"
                                    // value={credentials.fullname}
                                    placeholder="Enter Fullname"
                                    onChange={handleChange}
                                    required
                                />
                                {/* <ImgUploader onUploaded={onUploaded} /> */}
                                {/* <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                    required
                                /> */}
                            </>
                        )}
                    <button>{isSignup ? 'Sign up' : 'Continue'}</button>
                </form>
                <div className='toggle-login-signup flex'>
                    {/* <hr /> */}
                    <button className='clean-btn' onClick={toggleSignup}>{!isSignup ? 'Dont have a user? signup' : 'Have a user? login'}</button>
                    <button className='clean-btn guest' onClick={onConnectAsAUser}>Dont want to {isSignup ? 'signUp' : 'Login'}? connect as a guest</button>
                </div>
            </div>
            <footer className='login-footer'>
                {/* <div className='footer-imgs'>
                    <img className='right-img' src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.505/trello-right.3ee60d6f.svg" alt="" />
                    <img className='left-img' src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.505/trello-left.4f52d13c.svg" alt="" />
                </div> */}
            </footer>
        </div>
    )
}