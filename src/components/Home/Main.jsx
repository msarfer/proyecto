import { Route, Switch } from 'wouter'
import MainTabs from './MainTabs'
import LoginForm from '../Header/LoginForm'
import Dashboard from '../Dashboard/Dashboard'

export default function Main () {
  return (
    <main className='h-full w-full overflow-y-auto'>
      <Route path='/' component={MainTabs}/>
      <Route path='/login' component={LoginForm}/>
      <Switch>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/dashboard/:id' component={Dashboard}/>
      <Route path='/dashboard/:id/news' component={Dashboard}/>
      <Route path='/dashboard/:id/grades' component={Dashboard}/>
      <Route path='/dashboard/:id/remove' component={Dashboard}/>
      <Route path='/dashboard/:id/members' component={Dashboard}/>
      </Switch>
    </main>
  )
}
