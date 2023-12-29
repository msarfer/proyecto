import { Card } from 'flowbite-react'

export default function StudentCard ({ data }) {
  return (
    <Card className="max-w-sm">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.name} {data.surname}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {data.dni}
      </p>
    </Card>
  )
}
