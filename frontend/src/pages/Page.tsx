
import { useAuthData } from '../context/AuthContext'
import Auth from './auth'
import Main from './main'

const Page = () => {
    const { token } = useAuthData()
    return (
        <>
            {token ? <Main /> : <Auth />}
        </>
    )
}

export default Page
