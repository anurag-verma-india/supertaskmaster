import Cookies from "universal-cookie";
import { useContext, useEffect, useState } from "react";
import { userObjContext } from "../context/context";
import { TaskList } from "./TaskList";
import Task from "./Task";
import { useAuthState } from "react-firebase-hooks/auth";

import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import Modal from "./AddTaskModal";

// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     Button,
//     useDisclosure,
// } from "@chakra-ui/react";

const TaskListCollection = () => {
    const [openModal, setOpenModal] = useState(false);
    const [authUser] = useAuthState(auth);
    const [taskObj, setTaskObj] = useState({});
    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });

    useEffect(() => {
        const localTaskObj = JSON.parse(localStorage.getItem("taskObj"));
        setTaskObj(localTaskObj);

        const uid = cookies.get("uid");
        const userRef = ref(db, "tasks/" + uid);

        onValue(userRef, (snapshot) => {
            const taskObjSnap = snapshot.val();
            // console.log(taskObjSnap);
            setTaskObj(taskObjSnap);
        });
    }, []);

    useEffect(() => {
        if (taskObj && Object.keys(taskObj).length !== 0) {
            localStorage.setItem("taskObj", JSON.stringify(taskObj));
        }
    }, [taskObj]);

    const handleAddClick = () => {
        // alert("You clicked +");
        setOpenModal(!openModal);
    };

    const assembleTask = (tasksObj, listNumber) => {
        let finalArr = [];
        if (taskObj !== null && taskObj !== undefined) {
            for (const [taskID, taskDetails] of Object.entries(tasksObj)) {
                if (taskDetails) {
                    // for (const [key, value] of Object.entries(taskDetails)) {
                    //     console.log(`--->${key} = ${value}`);
                    // }
                    // console.log("\n");
                    try {
                        finalArr.push(
                            <Task
                                id={taskID}
                                key={taskID}
                                title={taskDetails.title}
                                state={
                                    taskDetails.isChecked
                                        ? taskDetails.isChecked
                                        : false
                                }
                                listNum={listNumber}
                            />
                        );
                    } catch (error) {
                        console.log("Assemble task error\n", error);
                    }
                }
            }
            // window.location.reload()
            return finalArr;
        }
    };

    return (
        <>
            {openModal && <Modal closeModalFunction={setOpenModal} />}
            <div className="tasklist-container">
                {/* {returnTaskLists()} */}
                <TaskList listNumber="0" key="0">
                    {authUser &&
                        taskObj &&
                        taskObj.list0 &&
                        assembleTask(taskObj.list0, 0)}
                </TaskList>
                <TaskList listNumber="1" key="1">
                    {authUser &&
                        taskObj &&
                        taskObj.list1 &&
                        assembleTask(taskObj.list1, 1)}
                </TaskList>
                <TaskList listNumber="2" key="2">
                    {authUser &&
                        taskObj &&
                        taskObj.list2 &&
                        assembleTask(taskObj.list2, 2)}
                </TaskList>
                <TaskList listNumber="3" key="3">
                    {authUser &&
                        taskObj &&
                        taskObj.list3 &&
                        assembleTask(taskObj.list3, 3)}
                </TaskList>
                <div className="center-wheel" onClick={handleAddClick}>
                    +
                </div>
            </div>
            {/* {BasicModal()} */}
        </>
    );
};

export default TaskListCollection;
