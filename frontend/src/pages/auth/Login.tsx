import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik';
import { useLoginAPI } from '../../services/auth.services';
import { useAuthData } from '../../context/AuthContext';


interface InitialValue {
  email: string;
  password: string
}

const Login = () => {

  const {loginAPI, isLoading} = useLoginAPI()
  const {setToken} = useAuthData()
  const navigate = useNavigate()

  const [initialValue] = useState<InitialValue>({
    email: '',
    password: ''
  })
  
  
  // TODO use validation schema: yup.
  const handleLogin = async (values: InitialValue) => {
    console.log('values: ', values);
    const {email, password} = values;

    if (!email || !password) {
      alert('Validation Error')
      return
    }

    const res = await loginAPI(values);
    if (res?.response_type === 'success') {
      //Store the user details and token 
      // Change the set
      console.log("res: ", res)
      setToken(res?.responseData?.access_token);
      navigate('/');
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mt-5">Login</h2>
          <Formik
            initialValues={initialValue}
            onSubmit={handleLogin}
          >
            {(() => {
              return (
                <Form>
                  <div className="form-group">
                    <label>Email</label>
                    <Field name='email' placeholder='email' type='email' className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <Field name='password' placeholder='password' type='password' className="form-control" />
                  </div>
                  <button disabled={isLoading} type="submit" className="btn btn-primary btn-block">Login</button>
                </Form>
              )
            })}
          </Formik>
          <p className="text-center mt-3">Create a new account? <Link to="/register"> Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
