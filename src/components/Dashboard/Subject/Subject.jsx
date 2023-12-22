import { Route } from 'wouter'
import Tasks from './Tasks'
import News from './News'
import Sections from './Sections'

export default function Subject ({ subject }) {
  return (
    <section className="flex h-full">
      <Sections/>
      <div className='bg-red-50 w-full'>
        <Route path="/dashboard/:id/tasks" component={Tasks} />
        <Route path="/dashboard/:id/news" component={News} />
      </div>
    </section>
  )
}
