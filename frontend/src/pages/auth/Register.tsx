import { Field, Formik, Form } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterAPI } from '../../services/auth.services';

interface InitialValue {
  first_name: string;
  last_name: string;
  email: string;
  password: string
}

const Register = () => {

  const {registerAPI, isLoading} = useRegisterAPI()
  const navigate = useNavigate()

  const [initialValue] = useState<InitialValue>({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  })


   // TODO use validation schema: yup.
   const handleRegister = async (values: InitialValue) => {
    const {first_name, last_name, email, password} = values

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password
    ) {
      alert('Validation Error');
      return;
    }

    const res = await registerAPI(values);

    if (res?.response_type === 'success') {
      navigate('/login')
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mt-5">Register</h2>
          <Formik
            initialValues={initialValue}
            onSubmit={handleRegister}
          >
            {(() => {
              return (
                <Form>
                  <div className="form-group">
                    <label>First Name</label>
                    <Field name='first_name' placeholder='First Name'  className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <Field name='last_name' placeholder='Last Name' className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <Field name='email' placeholder='email' type='email' className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <Field name='password' placeholder='password' type='password' className="form-control" />
                  </div>
                  <button disabled={isLoading} type="submit" className="btn btn-primary btn-block">Register</button>
                </Form>
              )
            })}
          </Formik>
          <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
