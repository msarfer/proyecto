import { Route } from 'wouter'
import Grades from './Grades/Grades'
import News from './News/News'
import Sections from './Sections'

export default function Subject ({ subject }) {
  const { id } = subject

  // Check if student or lecturer are in the subject with useEffect

  return (
    <section className="flex h-full bg-transparent">
      <Sections id={id}/>
      <div className='overflow-auto w-full p-1'>
        <Route path="/dashboard/:id" component={() => <h1>Inicio</h1>} />
        <Route path="/dashboard/:id/news" component={News} />
        <Route path="/dashboard/:id/grades" component={Grades} />
      </div>
    </section>
  )
}
