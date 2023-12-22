import { useParams } from 'wouter'

export default function Tasks () {
  const { id } = useParams()
  return (
    <h1>Tasks of { id }</h1>
  )
}
