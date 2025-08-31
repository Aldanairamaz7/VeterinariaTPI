import { faClock, faPills, faScissors, faStethoscope } from '@fortawesome/free-solid-svg-icons'

export const services = [
    {
        title: 'Consultas',
        description: 'Atencion General para mascotas. Evaluacion clinica y seguimiento',
        icon: faStethoscope
    },
    {
        title: 'Castraciones',
        description: 'Procedimientos quirurgicos seguros para el bienestar de tu mascota',
        icon: faScissors
    },
    {
        title:'Medicamentos',
        description:'Disponibilidad de medicamentos veterinarios autorizados y asesoramiento profesional',
        icon: faPills
    },
    {
        title: 'Atencion las 24hs',
        description: 'Emergencias disponibles las 24 horas, los 7 dias de la semana.',
        icon: faClock
    }
]