import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Forum from './components/Forum'
import Profile from './components/Profile'
import LegalNotice from './components/LegalNotice'

export default [
    {path: '/', component: Home},
    {path: '/Register', component: Register},
    {path: '/Login', component: Login},
    {path: '/Forum', component: Forum},
    {path: '/Profile', component: Profile},
    {path: '/LegalNotice', component: LegalNotice},
]