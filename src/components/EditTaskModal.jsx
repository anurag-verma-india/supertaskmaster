import { useEffect, useState } from "react";
import "./Modal.css";
import "./EditModal.css";
import Cookies from "universal-cookie";

import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase/firebase";

const EditTaskModal = ({
    closeModalFunction,
    taskTitle,
    taskList,
    taskID,
    taskState,
}) => {
    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });
    const closeModal = () => {
        closeModalFunction(false);
    };

    const [currTask, setCurrTask] = useState({
        title: taskTitle,
        list: taskList,
        taskIDState: taskID,
        isChecked: taskState,
    });

    const handleTaskSave = () => {
        // const randomID = Math.random().toString(36).slice(2);
        const uid = cookies.get("uid");
        // console.log("saving")

        // tasks/uid/list(num)/(taskID)/{task}

        // If the task id has changed
        if (currTask.list !== taskList) {
            // set the original task to empty (i.e. delete it)
            set(ref(db, `tasks/${uid}/list${taskList}/${taskID}`), {});
        }

        set(ref(db, `tasks/${uid}/list${currTask.list}/${taskID}`), {
            title: currTask.title,
            state: false,
            EditedTime: Date.now(),
            isChecked: currTask.isChecked,
        });

        closeModal();
    };
    return (
        <>
            <div className="modalExtBG" onClick={closeModal} />
            <div className="modalBackground">
                <div className="modalContainer">
                    <form onSubmit={handleTaskSave}>
                        <div className="titleCloseBtn">
                            <button onClick={closeModal}>x</button>
                        </div>
                        <div className="title">
                            <h1>Edit Task</h1>
                        </div>
                        <div className="body">
                            <div className="inputContainer">
                                <label htmlFor="task" id="taskLabel">
                                    Task Title
                                </label>
                                <input
                                    id="taskInput"
                                    type="text"
                                    placeholder="Add your task"
                                    value={currTask.title}
                                    onChange={(e) => {
                                        setCurrTask({
                                            ...currTask,
                                            title: e.target.value,
                                        });
                                    }}
                                />
                                <select
                                    name="taskGroup"
                                    id="taskGroup"
                                    onChange={(e) => {
                                        setCurrTask({
                                            ...currTask,
                                            list: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="0">Do First</option>
                                    <option value="1">Do Later</option>
                                    <option value="2">Delegate</option>
                                    <option value="3">Eliminate</option>
                                </select>
                            </div>
                        </div>
                        <div className="footer">
                            <button id="cancelBtn" onClick={closeModal}>
                                Cancel
                            </button>
                            <input type="submit" value="Save" id="saveTask" />
                            {/* <button
                                type="submit"
                                id="saveTask"
                                onClick={handleTaskSave}
                            >
                                Save
                            </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditTaskModal;
