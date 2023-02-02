import React, { useEffect, useState } from "react";
import CreateTask from "../Modals/CreateTask";
import Card from "./Card";
import TransitionAlerts from "./AlertSuccess";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { GrClose } from "react-icons/gr";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }

    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, [alert, taskList]);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setMessage("Tarea eliminada con éxito");
    setAlert(true);
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setMessage("Tarea actualizada con éxito");
    setAlert(true);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setMessage("Tarea creada con éxito");
    setAlert(true);
    setModal(false);
  };

  return (
    <>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              taskObj={obj}
              index={index}
              deleteTask={
                // crear una alerta con sweetalert
                () => {
                  const MySwal = withReactContent(Swal);
                  MySwal.fire({
                    title: "¿Estás seguro?",
                    text: "No podrás revertir esto!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, bórralo!",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteTask(index);
                      MySwal.fire(
                        "¡Borrado!",
                        "Tu archivo ha sido borrado.",
                        "success"
                      );
                    }
                  });
                }
              }
              updateListArray={updateListArray}
            />
          ))}
        <Box sx={{ width: "100%" }}>
          <Collapse in={alert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  <GrClose fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          </Collapse>
        </Box>
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
