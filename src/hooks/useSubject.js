import { useEffect, useState } from 'react'

export const useSubject = (id) => {
  const [subject, setSubject] = useState({})

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/subjects/${id}`)
        .then((res) => res.json())
        .then((data) => setSubject(data))
    }
  }, [id])

  return { subject, setSubject }
}
