import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CreateTask = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {

        const {name, value} = e.target

        if (name === "taskName") {
            setTaskName(value);
        } else {
            setDescription(value);
        }
    }

    const handleSave = () => {
        let taskObj = {};
        taskObj["Name"] = taskName;
        taskObj["Description"] = description;
        save(taskObj);
    }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Crear tarea</ModalHeader>
        <ModalBody>
          <form action="">
            <div className="mb-3">
                <label htmlFor="" className="form-label">Nombre de la Tarea</label>
                <input type="text" name="taskName" id="" className="form-control" value={taskName} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Descripción</label>
                <textarea name="description" id="" rows="5" className="form-control" value={description} onChange={handleChange}></textarea>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Crear
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateTask;
