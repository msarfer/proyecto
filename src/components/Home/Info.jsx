import { List, Kbd } from 'flowbite-react'

const degrees = {
  'Ingeniería Informática': {
    Primero: ['Álgebra', 'Análisis', 'Estadística', 'Fundamentos Físicos de la Informática', 'Fundamentos de Computadores', 'Introducción a la informática y a la programación', 'Programación', 'Tecnología de Computadores', 'Matemática discreta', 'Fundamentos y organización de empresas'],
    Segundo: ['Concurrencia y Sistemas Distribuidos', 'Estructura de Datos y Algoritmos', 'Fundamentos de Sistemas Operativos', 'Estructura de Computadores', 'Lenguajes tecnologías y paradigmas de la programación', 'Redes de Computadores I', 'Redes de Computadores II', 'Inglés'],
    Tercero: ['Arquitectura e Ingeniería de Computadores', 'Bases de Datos y Sistemas de Información', 'Computación Paralela', 'Gestión de proyectos', 'Ingeniería del software', 'Sistemas inteligentes', 'Tecnología de sistemas de información en la red'],
    Cuarto: ['Arquitectura e Ingeniería de Computadores', 'Bases de Datos y Sistemas de Información', 'Computación Paralela', 'Gestión de proyectos', 'Ingeniería del software', 'Sistemas inteligentes', 'Tecnología de sistemas de información en la red']
  }
}

export default function Info () {
  return (
    <main className="px-2">
      <section>
        <h1 className="text-3xl">UPV</h1>
        <p className='text-justify'>
          La UPV se reconoce como una universidad que contribuye a la innovación
          de las empresas y de otras entidades de nuestra sociedad. Con este
          propósito, la institución forma a personas con espíritu innovador y
          emprendedor en sus centros docentes, genera conocimiento y tecnología
          que transfiere a la sociedad y entorno socioeconómico desde sus
          unidades de investigación. Para facilitar que esta contribución en
          innovación pueda llegar a la sociedad, se ha creado el programa UPV
          Innovación que cuenta con diversas unidades especializadas en la
          promoción y canalización de la relación con empresas e instituciones:
        </p>
        <List nested className="text-black dark:text-black">
          <List.Item>
            El Servicio de Promoción y Apoyo a la Investigación, Innovación y
            Transferencia, i2T, en el ámbito de la transferencia de conocimiento
            UPV.
          </List.Item>
          <List.Item>
            La Fundación Ciudad Politécnica de la Innovación, en servicios
            relacionados con el Parque Científico de la UPV.
          </List.Item>
          <List.Item>
            El Programa CPI Europe, en el ámbito de la preparación de proyectos
            Horizonte 2020 y Horizonte Europa.
          </List.Item>
        </List>
      </section>
      <section className="mt-3">
        <h1 className="text-3xl">Guía de Estudios</h1>
        {Object.entries(degrees).map(([degree, courses]) => {
          return (
            <article key={degree} className='m-1'>
              <h2 className="text-2xl">{degree}</h2>
              {Object.entries(courses).map(([course, subjects]) => (
                <>
                  <h3 key={`${degree}-${course}`} className="text-xl mt-2">{course}</h3>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {subjects.map(subject => <Kbd key={`${degree}-${course}-${subject}`}>{subject}</Kbd>)}
                  </div>
                </>
              ))}
            </article>
          )
        })}
      </section>
    </main>
  )
}
