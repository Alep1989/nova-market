import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

const LogoutModal =({show, onHide}) => {
    const handleLogout = ()=>{
        //aca va la lógica de cerrar sesión;
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Cerrar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Esta seguro que desea cerrar la sesion?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LogoutModal;