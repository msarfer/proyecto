import { ListGroup } from 'flowbite-react'
import {
  HiCloudDownload,
  HiInbox,
  HiTrash,
  HiUserCircle
} from 'react-icons/hi'
import { useLocation } from 'wouter'
import { useStateStore } from '../../../store'

export default function Sections ({ id }) {
  const [location, setLocation] = useLocation()
  const user = useStateStore((state) => state.user)

  return (
    <div className="flex [&>*]:bg-gray-200 [&>*]:dark:bg-[#212528] h-full">
      <ListGroup className="w-36 rounded-none [&>*]:rounded-none">
        <ListGroup.Item
          icon={HiUserCircle}
          className="border-none hover:rounded-t-none"
          onClick={() => setLocation(`/dashboard/${id}`)}
        >
          Inicio
        </ListGroup.Item>
        {/* <ListGroup.Item onClick={() => setLocation(`/dashboard/${id}/tasks`)} icon={HiOutlineAdjustments}>Tareas</ListGroup.Item> */}
        <ListGroup.Item onClick={() => setLocation(`/dashboard/${id}/news`)} icon={HiInbox}>Noticias</ListGroup.Item>
        {/* <ListGroup.Item onClick={() => setLocation(`/dashboard/${id}/resources`)} icon={HiCloudDownload}>Recursos</ListGroup.Item> */}
        <ListGroup.Item onClick={() => setLocation(`/dashboard/${id}/grades`)} icon={HiCloudDownload}>Notas</ListGroup.Item>
        {
          user.role === 'manager' &&
          <ListGroup.Item icon={HiTrash} onClick={() => setLocation(`/dashboard/${id}/remove`)}>Eliminar</ListGroup.Item>
        }
      </ListGroup>
    </div>
  )
}
