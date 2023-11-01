import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useStateContext } from "../contexts/contextProvider";


const RemoveElmentModal = ({ handleRemoveInput }) => {
    const { setConfirmRemove, setSidebar } = useStateContext()

    return (
        <div
            // className="modal show"
            className="modal-container"
        // style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog style={{ width: '100%' }}>
                <Modal.Header
                >
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setConfirmRemove(false)
                    }}>No</Button>
                    <Button variant="primary" onClick={() => {
                        if(handleRemoveInput){
                           handleRemoveInput()
                        }else{
                            document.querySelector(".focussedd")?.remove();
                        }
                        setConfirmRemove(false)
                        setSidebar(false)
                    }}>yes</Button>
                </Modal.Footer>
            </Modal.Dialog>
            {/* </Modal> */}

        </div>
    );
}

export default RemoveElmentModal;