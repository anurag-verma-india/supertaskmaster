import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskListCollection from "./components/TaskListCollection";
import Navbar from "./components/Navbar";
import { useState } from "react";

import { userObjContext } from "./context/context";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import PleaseLogIn from "./components/PleaseLogIn";

function App() {
    const [userGlobalObj, setUserGlobalObj] = useState({});
    const [authUser] = useAuthState(auth);

    return (
        <>
            <userObjContext.Provider value={[userGlobalObj, setUserGlobalObj]}>
                <Navbar />
                <ToastContainer />
                {authUser && <TaskListCollection />}
                {!authUser && <PleaseLogIn />}
            </userObjContext.Provider>
        </>
    );
}

export default App;
