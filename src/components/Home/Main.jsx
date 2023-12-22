import { Route, Switch } from 'wouter'
import Test from './MainTabs'
import LoginForm from '../Header/LoginForm'
import Dashboard from '../Dashboard/Dashboard'

export default function Main () {
  return (
    <main className='h-full w-full'>
      <Route path='/' component={Test}/>
      <Route path='/login' component={LoginForm}/>
      <Switch>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/dashboard/:id' component={Dashboard}/>
      <Route path='/dashboard/:id/tasks' component={Dashboard}/>
      <Route path='/dashboard/:id/news' component={Dashboard}/>
      <Route path='/dashboard/:id/resources' component={Dashboard}/>
      <Route path='/dashboard/:id/grades' component={Dashboard}/>
      </Switch>
    </main>
  )
}
