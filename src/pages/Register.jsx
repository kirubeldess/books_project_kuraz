import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { UserAuth } from '../services/AuthContext'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const { session, signUpNewUser } = UserAuth()
    const navigate = useNavigate()
    console.log(session);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
            return 'Email is required'
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address'
        }
        return ''
    }

    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required'
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters long'
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return 'Password must contain at least one lowercase letter'
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return 'Password must contain at least one uppercase letter'
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number'
        }
        return ''
    }
    const validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) {
            return 'Please confirm your password'
        }
        if (confirmPassword !== password) {
            return 'Passwords do not match'
        }
        return ''
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        setEmailError(validateEmail(value))
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        setPasswordError(validatePassword(value))
        if (confirmPassword) {
            setConfirmPasswordError(validateConfirmPassword(confirmPassword, value))
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
        setConfirmPasswordError(validateConfirmPassword(value, password))
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError('')

        const emailValidation = validateEmail(email)
        const passwordValidation = validatePassword(password)
        const confirmPasswordValidation = validateConfirmPassword(confirmPassword, password)

        setEmailError(emailValidation)
        setPasswordError(passwordValidation)
        setConfirmPasswordError(confirmPasswordValidation)

        if (emailValidation || passwordValidation || confirmPasswordValidation) {
            return
        }

        setLoading(true)
        try {
            const result = await signUpNewUser(email, password)

            if (result.success) {
                navigate('/details')
            } else {
                setError(result.error || 'registration failed :(.')
            }
        } catch (error) {
            setError('An error occurred during registration. Please try again :( ')
            console.error('Registration error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
                <h2 className='font-bold pb-2 text-2xl'>Sign Up</h2>
                <p className='mb-4'>Already have an account? <Link to="/signin" className='text-blue-600 hover:text-blue-800'>Sign in</Link></p>
                <div className='flex flex-col space-y-4'>
                    <div>
                        <input 
                            onChange={handleEmailChange} 
                            className={`p-3 w-full border-2 rounded-md placeholder:text-gray-400 ${
                                emailError ? 'border-red-500' : 'border-gray-300'
                            }`} 
                            placeholder='Enter your email' 
                            type="email" 
                            value={email}
                        />
                        {emailError && <p className='text-red-500 text-sm mt-1'>{emailError}</p>}
                    </div>
                    
                    <div>
                        <input 
                            onChange={handlePasswordChange} 
                            className={`p-3 w-full border-2 rounded-md placeholder:text-gray-400 ${
                                passwordError ? 'border-red-500' : 'border-gray-300'
                            }`} 
                            placeholder='Enter your password' 
                            type="password" 
                            value={password}
                        />
                        {passwordError && <p className='text-red-500 text-sm mt-1'>{passwordError}</p>}
                        <div className='text-xs text-gray-600 mt-1'>
                            Password must be at least 6 characters with uppercase, lowercase, and number
                        </div>
                    </div>
                    
                    <div>
                        <input 
                            onChange={handleConfirmPasswordChange} 
                            className={`p-3 w-full border-2 rounded-md placeholder:text-gray-400 ${
                                confirmPasswordError ? 'border-red-500' : 'border-gray-300'
                            }`} 
                            placeholder='Confirm your password' 
                            type="password" 
                            value={confirmPassword}
                        />
                        {confirmPasswordError && <p className='text-red-500 text-sm mt-1'>{confirmPasswordError}</p>}
                    </div>
                    
                    <Button 
                        type='submit' 
                        disabled={loading || emailError || passwordError || confirmPasswordError} 
                        className='mt-4'
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                    
                    {error && <p className='text-red-500 text-center pt-4'>{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default Signup