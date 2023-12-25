import { Route } from 'wouter'
import News from './News/News'
import Sections from './Sections'
import Tasks from './Tasks'

export default function Subject ({ subject }) {
  const { id } = subject
  return (
    <section className="flex h-full bg-transparent">
      <Sections id={id}/>
      <div className='overflow-y-auto w-full p-1'>
        <Route path="/dashboard/:id" component={() => <h1>Inicio</h1>} />
        <Route path="/dashboard/:id/tasks" component={Tasks} />
        <Route path="/dashboard/:id/news" component={News} />
      </div>
    </section>
  )
}
