import { useParams } from 'wouter'

export default function News () {
  const { id } = useParams()
  return (
    <h1>News of { id }</h1>
  )
}
