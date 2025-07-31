import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { UserAuth } from '../services/AuthContext'

const Signup = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState('')

    const {session,signUpNewUser} = UserAuth()
    const navigate = useNavigate()
    console.log(session);

    const handleSignUp = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const result = await signUpNewUser(email,password)

            if(result.success){
                navigate('/details')
            }
        }catch(error){
            setError('an error happened',error.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
        <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
            <h2 className='font-bold pb-2'>Sign Up</h2>
            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            <div className='flex flex-col'>
                <input onChange={(e)=>setEmail(e.target.value)} className='p-3 mt-2 border-2 border-gray-300 rounded-md placeholder:text-gray-400' placeholder='Enter your email' type="email" />
                <input onChange={(e)=>setPassword(e.target.value)} className='p-3 mt-2 border-2 border-gray-300 rounded-md placeholder:text-gray-400' placeholder='Enter your password'  type="password" />
                <Button type='submit' disabled={loading} className='mt-4'>Sign Up</Button>
                {error && <p className='text-red-500 text-center pt-4'>{error}</p>}
            </div>
        </form>
    </div>
  )
}

export default Signup