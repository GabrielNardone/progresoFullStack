//importamos el calendario y el dateFns que es para el idioma
import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import { localizer } from '../../helpers'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { CalendarEventBox, CalendarModal, NavBar } from "../"



const events = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Gabriel'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) =>{
  
    const style = {
      backgroundColor: '#228B22',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return{
      style
    }
  }

  //Tenemos que conectar estas funciones al calendario para que cuando
  //uno de estos eventos suceda la función se active
  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
  }
  const onSelect = (event) => {
    console.log({click: event});
  }
  //cuando la vista cambia voy a almazear esa información en
  //el LocalStorage y voy a utilizarla para que cada vez que 
  //se recargue el navegador permanezca en la pestaña en donde se cerró
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  return (

    //Vamos a regresar varios componentes en la página principal del calendario
    <>
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }} //permite hacer un calculo para acomodar bien el tamaño en pantalla del elemento
        eventPropGetter={eventStyleGetter} //devuelve propiedades que agregas a la función designada
        components={{
          event: CalendarEventBox
        }}
        //estos eventos pertenecen al paquete calendario que descargamos de terceros
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        
      />


      <CalendarModal/>

    </>
  )
}
