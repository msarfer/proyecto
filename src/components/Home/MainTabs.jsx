import { Tabs } from 'flowbite-react'
import { HiDocumentText, HiLibrary, HiHome } from 'react-icons/hi'

export default function Component () {
  return (
    <Tabs aria-label="Default tabs" style="fullWidth" className='[&>button]:bg-gray-200 [&>button]:dark:bg-[#212528] [&>*]:m-0'>
      <Tabs.Item active title="Infraestructura" icon={HiHome}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.029607526712!2d-0.47951208438820686!3d38.69416416650258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6187b2cad96207%3A0x7cd3501aa77a7c07!2sUniversitat%20Polit%C3%A8cnica%20de%20Val%C3%A8ncia.%20Campus%20de%20Alcoy!5e0!3m2!1ses!2ses!4v1638735384335!5m2!1ses!2ses"
        className='w-full h-[650px]'
        loading="lazy"
        aria-hidden="false"
        tabIndex="0" />
      </Tabs.Item>
      <Tabs.Item title="Información" icon={HiDocumentText}>
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab&apos;s associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
      <Tabs.Item title="Contacto" icon={HiLibrary}>
        This is <span className="font-medium text-gray-800 dark:text-white">Settings tab&apos;s associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
    </Tabs>
  )
}
