import { ListGroup } from 'flowbite-react'
import {
  HiCloudDownload,
  HiInbox,
  HiOutlineAdjustments,
  HiUserCircle
} from 'react-icons/hi'

export default function Sections ({ id }) {
  return (
    <div className="flex  [&>*]:bg-gray-200 [&>*]:dark:bg-[#212528]">
      <ListGroup className="w-48 rounded-none [&>*]:rounded-none">
        <ListGroup.Item icon={HiUserCircle} className='border-none hover:rounded-t-none'>
          Inicio
        </ListGroup.Item>
        <ListGroup.Item icon={HiOutlineAdjustments}>Tareas</ListGroup.Item>
        <ListGroup.Item icon={HiInbox}>Noticias</ListGroup.Item>
        <ListGroup.Item icon={HiCloudDownload}>Recursos</ListGroup.Item>
        <ListGroup.Item icon={HiCloudDownload}>Calificaciones</ListGroup.Item>
      </ListGroup>
    </div>
  )
}
