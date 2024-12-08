import Cookies from "universal-cookie";
import EditIcon from "../assets/edit.svg";
import { useEffect, useState } from "react";

import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";

export const TaskList = ({ listNumber, children }) => {
    const [userObj, setUserObj] = useState({
        taskListTitles: ["...", "...", "...", "..."],
    });

    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });
    useEffect(() => {
        const uid = cookies.get("uid");
        const userRef = ref(db, "users/" + uid);

        onValue(userRef, (snapshot) => {
            const userObj = snapshot.val();
            // console.log(userObj.taskLists);
            setUserObj(userObj);
        });
    }, []);

    const handleTitleEditClick = (e) => {
        alert("You clicked edit title");
        // console.log(userObj.taskListTitles);
        console.log(e.target);
    };
    return (
        <div key={listNumber} className={`list${listNumber} tasklist`}>
            <div className="taskheading-container">
                <div className="taskheading">
                    {userObj.taskListTitles[listNumber]}
                </div>
                {/* <div className="taskheading">Hello</div> */}
                {/* <div className="taskheading">{arr[i]}</div> */}
                {/* <div className="taskheading">
                            {userObj.taskLists[i]}
                        </div> */}
                <div
                    className="icon-container"
                    onClick={(e) => {
                        handleTitleEditClick(e);
                    }}
                >
                    <img
                        style={{ height: "1.5rem" }}
                        className="edit-icon-img"
                        src={EditIcon}
                        alt="Edit"
                    />
                </div>
            </div>
            {/* <div className="task-container">{returnTasks([1, 2, 3, 4])}</div> */}
            <div className="task-container">{children}</div>
        </div>
    );
};
