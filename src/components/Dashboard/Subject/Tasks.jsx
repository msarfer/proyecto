import { useParams } from 'wouter'
import { useSubject } from '../../../hooks/useSubject'

export default function Tasks () {
  const { id } = useParams()
  const { subject } = useSubject(id)
  return (
    <h1>Tasks of { id }-{subject.name}</h1>
  )
}
