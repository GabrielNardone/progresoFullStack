//Importamos el Modal del paquete de terceros que instalamos
import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal" //Importación del paquete de terceros
import DatePicker from "react-datepicker"; //Importamos el datePicker desde terceros
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2"; //Importación de paquete de terceros sobre alertas
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from "../../hooks";

//Los customStyles vienen así desde la página y configura la posición del modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

//Esto es para sobreponer el modal a los demás elementos de la pantalla,
//para eso le pasamos el id del elemento principal de nuestro html: #root
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [onFormSubmitted, setOnFormSubmitted] = useState(false); //Nuevo estado para controlar la validación del form y enviar alertas
    const { activeEvent, savingEvent } = useCalendarStore();

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2) //añade horas a la fecha
    });

    //useMemo para memorizar el valor. Primero, si el form no se ha disparado entonces devuelve un string vacio,
    //es decir, no se va a mostrar nada en el className del input, pero si se dispara y no cumple 
    //la condición, muestra el alerta
    const titleClass = useMemo(() => {
        if (!onFormSubmitted) return '';

        return (formValues.title.length > 0) ? '' : 'is-invalid';

    }, [formValues.title, onFormSubmitted]) //Dos dependencias. Tienen que volver a mermorizar este valor si el título cambia o si el onFromSubmitted cambia

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent })
        }
    }, [activeEvent])


    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (date, changing) => {
        setFormValues({
            ...formValues,
            [changing]: date
            //start: date
        })
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    //Función para validar y guardar los datos ingresados en el form
    const onSubmit = (event) => {
        event.preventDefault();
        setOnFormSubmitted(true);

        //Validación. La fecha final no puede ser menor a la fecha inicial
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(difference) || difference <= 0) {
            //Paquete de terceros para las alertas
            Swal.fire('Incorrect dates', 'Check the selected dates', 'error')
            return;
        }

        //Validación del título
        if (formValues.title.length <= 0) return;

        savingEvent(formValues);
        closeDateModal();
        setOnFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName={'modal-fondo'}
            closeTimeoutMS={200}
        >
            <h1> New event </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Start date and time</label>
                    {/* Donde tenemos la fecha y hora de inicio utilizamos el datePicker
                    al cual hay que envierle cierta información */}
                    <DatePicker
                        className="form-control" //clase de Bootstrap
                        selected={formValues.start}
                        onChange={(date) => onDateChange(date, 'start')}
                        dateFormat="Pp"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>End date and time</label>
                    <DatePicker
                        className="form-control" //clase de Bootstrap
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(date) => onDateChange(date, 'end')}
                        dateFormat="Pp"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and notes</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">A short description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional Information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save </span>
                </button>

            </form>
        </Modal>
    )
}
