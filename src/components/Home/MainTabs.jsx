import { Badge, List, ListGroup, Tabs } from 'flowbite-react'
import { FaInstagram, FaXTwitter, FaPhone } from 'react-icons/fa6'
import { HiDocumentText, HiHome, HiUserCircle, HiCheck, HiClock } from 'react-icons/hi'
import Info from './Info'

export default function Component () {
  return (
    <Tabs aria-label="Default tabs" style="fullWidth" className='[&>button]:bg-gray-200 [&>button]:dark:bg-[#212528] [&>*]:m-0'>
      <Tabs.Item active title="Infraestructura" icon={HiHome}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.029607526712!2d-0.47951208438820686!3d38.69416416650258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6187b2cad96207%3A0x7cd3501aa77a7c07!2sUniversitat%20Polit%C3%A8cnica%20de%20Val%C3%A8ncia.%20Campus%20de%20Alcoy!5e0!3m2!1ses!2ses!4v1638735384335!5m2!1ses!2ses"
        className='w-full h-[650px]'
        loading="lazy"
        aria-hidden="false"
        aria-label="Mapa Universidad"
        tabIndex="0" />
      </Tabs.Item>
      <Tabs.Item title="Información" icon={HiDocumentText}>
        <Info />
      </Tabs.Item>
      <Tabs.Item title="Contacto" icon={HiUserCircle}>
        <main className='px-2'>
          <h2 className='text-3xl mb-2'>Normativa</h2>
          <ListGroup className='mb-4'>
            <ListGroup.Item icon={HiDocumentText} href='http://www.upv.es/entidades/SG/infoweb/sg/info/U0643262.pdf' target='_blank' rel="noreferrer"> Reglamento EPSA</ListGroup.Item>
            <ListGroup.Item icon={HiDocumentText} href="http://www.upv.es/entidades/SG/infoweb/sg/info/U0587806.pdf" target='_blank' rel="noreferrer">Reglamento Ing. Informática</ListGroup.Item>
            <ListGroup.Item icon={HiDocumentText} href="http://www.upv.es/entidades/SG/infoweb/sg/info/U0589883.pdf" target='_blank' rel="noreferrer">Reglamento Ing. Mecánica</ListGroup.Item>
          </ListGroup>
          <h2 className='text-3xl mb-2'>Redes Sociales</h2>
          <section className='flex flex-wrap gap-3'>
          <Badge color='pink' icon={FaInstagram} className='hover:scale-105' size='sm'><a href='https://www.instagram.com/upvcampusalcoy/' target='_blank' rel="noreferrer">upvcampusalcoy</a></Badge>
          <Badge color='blue' icon={FaXTwitter} className='hover:scale-105' size='sm'><a href='https://twitter.com/UPVCampusAlcoy' target='_blank' rel="noreferrer">UPVCampusAlcoy</a></Badge>
          <Badge color='yellow' icon={FaPhone} className='hover:scale-105' size='sm'>+34 123456789</Badge>
          </section>
        </main>
      </Tabs.Item>
    </Tabs>
  )
}
