import React, { lazy, ReactNode, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


const Register = lazy(() => import('./Register'))
const Login = lazy(() => import('./Login'))

const routes: Array<{ id: string; path: string, element: ReactNode }> = [
    {
        id: 'login',
        path: '/',
        element: <Navigate to={'/login'} />
    },
    {
        id: 'login-1',
        path: '/login',
        element: <Login />
    },
    {
        id: 'register',
        path: '/register',
        element: <Register />
    }
]

const Auth = () => {
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    {
                        routes.map((route) => {
                            return <Route key={route.id} path={route.path} element={route.element} />
                        })
                    }
                </Routes>
            </Suspense>
        </>
    )
}

export default Auth
