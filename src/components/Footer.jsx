import { Footer } from 'flowbite-react'
import { Link } from 'wouter'

export default function FooterInfo () {
  return (
    <Footer container className='absolute bottom-0 rounded-none bg-gray-200 dark:bg-[#212528]'>
      <Footer.Copyright href="https://www.upv.es" by="Poliformat™" year={2023} />
      <Footer.LinkGroup>
        <Footer.Link as={Link} href="/about">About</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  )
}
