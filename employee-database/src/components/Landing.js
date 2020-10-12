import React, {useEffect, useState} from 'react'

const Landing = ({setLoggedIn, setCurrentUser}) => {
    const [login, setlogin] = useState(false)
    const [register, setRegister] = useState(false)
    const [error, setError] = useState('')
    const [credentials, setCredentials] = useState({
      username: '',
      password: '',
      confirmPassword: ''
    })

    const handleChange = e => {
      const {name, value} = e.target
      setError('')
      setCredentials(prev => ({
        ...prev,
        [name]: value,
      }));
     }

    const handleRegister = async (e) => {
      e.preventDefault()
      const {username, password, confirmPassword} = credentials
      if(password !== confirmPassword){
        return setError('Passwords do not match')
      }

      try {
        const response = await fetch("/register", {
          method: "POST",
          body: JSON.stringify({username, password}),
          headers: { "Content-type": "application/json" },
        });

        const newUser = await response.json();
        if (newUser.error) {
          setError(newUser.error);
        } else {
          setCurrentUser(username)
          setLoggedIn(true)
          localStorage.setItem('user', JSON.stringify(newUser))
        }
      } catch (error) {
          return error
      }
    }

    const handleLogin = async e => {
      e.preventDefault()
      const {username, password} = credentials
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {"Content-type" : "application/json"}
      })
      const user = await response.json()
      if(user.error){
        setError(user.error)
      } else {
        setCurrentUser(username)
        setLoggedIn(true)
        localStorage.setItem('user', JSON.stringify(user))
      }
    }

    useEffect(() => {
      localStorage.clear()
    }, [])

    return (
      <div className='landingPage'>
        <div className='wave'>
        <img src={require("../public/images/waveTop.svg")} alt='wave'/>
        </div>
        <div className="container">
          <div className="landing">
            <div className='landingText'>
              <h1>Welcome to Flow</h1>
              <h3>Your simple employee management system.</h3>
            </div>
            <h3 style={{color: 'red'}}>{error}</h3>
            {login || register ? (
              <form onSubmit={register ? handleRegister : handleLogin}>
                <div className="inputs">
                  <input 
                    required
                    name='username' 
                    value={credentials.username}
                    type="email" 
                    placeholder="email" 
                    onChange={handleChange}/>
                  <input 
                    required
                    name='password' 
                    value={credentials.password} 
                    type="password" 
                    placeholder="password" 
                    onChange={handleChange} />
                  {register ?
                  <input 
                    name='confirmPassword' 
                    value={credentials.confirmPassword} 
                    type="password" 
                    placeholder="confirm password" 
                    onChange={handleChange}/>
                  : null}
                </div>
                <button className="landingButton" type='submit'>
                  {login ? 'Login' : 'Register'}
                </button>
                <button className='loginRegister' type='button' onClick={() => {
                  if(login){
                    setlogin(false)
                    setRegister(true)
                  } else {
                    setlogin(true)
                    setRegister(false)
                  }
                }
                }>{login ? 'Register' : 'Login'}</button>
              </form>
            ) : null}
            {login || register ? null : (
              <div className='landingButtons'>
                <button type='button' className="landingButton" onClick={() => setlogin(true)}>
                  Login
                </button>
                <button type='button' className="landingButton" onClick={() => setRegister(true)}>
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='wave waveBottom'>
        <img src={require("../public/images/waveBottom.svg")} alt='wave' />
        </div>
      </div>
    );
}

export default Landing