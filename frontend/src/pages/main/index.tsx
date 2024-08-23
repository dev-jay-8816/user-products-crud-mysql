import React, { lazy, ReactNode, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../../components/Header';


const UserProducts = lazy(() => import('./UserProducts'));
const AllProducts = lazy(() => import('./AllProducts'));
// const AddProducts = lazy(() => import('./AddProduct'));


const routes: Array<{ id: string; path: string, element: ReactNode }> = [
    {
        id: 'all-products',
        path: '/',
        element: <AllProducts />
    },
    {
        id: 'user-products',
        path: '/user-product',
        element: <UserProducts />
    }
]

const Main = () => {
    return (
        <>
        <Header />
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

export default Main
