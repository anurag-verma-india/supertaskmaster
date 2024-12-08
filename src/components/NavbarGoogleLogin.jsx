import GoogleLogo from "../assets/google.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import Cookies from "universal-cookie";

import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase/firebase";

const NavbarGoogleLogin = () => {
    const [authUser] = useAuthState(auth);

    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });

    // console.log("authUser\n", authUser);

    const [userEmailState, setUserEmailState] = useState("");

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                console.log(result);
                console.log("Name\n", result.user.displayName);
                console.log("Email\n", result.user.email);
                toast.success("You logged in successfully", {
                    position: "top-center",
                });

                cookies.set("userEmail", result.user.email);
                cookies.set("uid", result.user.uid);
                setUserEmailState(result.user.email);

                // Check if the user already exists in database
                const uid = cookies.get("uid");
                const userRef = ref(db, "users/" + uid);
                onValue(userRef, (snapshot) => {
                    const userFromDB = snapshot.val();
                    console.log("userFromDB\n", userFromDB);
                    cookies.set("userEmail", result.user.email);
                    cookies.set("uid", result.user.uid);
                    // User does not exist already then create one
                    if (!userFromDB) {
                        set(ref(db, "users/" + uid), {
                            username: result.user.displayName,
                            email: result.user.email,
                            taskListTitles: [
                                "Do First",
                                "Do Later",
                                "Delegate",
                                "Eliminate",
                            ],
                        });
                    }
                });

                const taskRef = ref(db, "tasks/" + uid);
                onValue(taskRef, (snapshot) => {
                    const taskObjDB = snapshot.val();
                    if (!taskObjDB) {
                        const localTaskObj = localStorage.getItem("taskObj");
                        if (!localTaskObj) {
                            // console.log(
                            //     "taskObj localstorage: \n",
                            //     localTaskObj
                            // );
                            set(ref(db, "tasks/" + uid), {
                                // Set from local storage
                                list0: {
                                    8498293: {
                                        creationTime: Date.now(),
                                        state: false,
                                        title: "sample task 1",
                                    },
                                },
                                list1: {},
                                list2: {},
                                list3: {},
                            });
                        } else {
                            set(
                                ref(db, "tasks/" + uid),
                                JSON.parse(localTaskObj)
                            );
                        }
                    }
                });

                window.location.reload();
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential =
                //     GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log("error code\n", errorCode);
                console.log("error message\n", errorMessage);
                toast.error(
                    `Login failed with this message: \n${errorMessage}`,
                    {
                        position: "top-center",
                    }
                );
            });
    };

    async function handleLogOut() {
        // alert("You clicked log out");
        // setAuthUser(!authUser);
        try {
            await auth.signOut();
            console.log("Logout successful");
            cookies.remove("userEmail");
            cookies.remove("uid");
            setUserEmailState("");
            localStorage.clear();
            toast.success("You logged out successfully", {
                position: "top-center",
            });
        } catch (error) {
            toast.error(`Error logging out: \n${error}`);
            console.log("Logout error: \n", error);
        }
    }

    const alreadyLoggedIn = () => {
        if (authUser && userEmailState === "") {
            setUserEmailState(cookies.get("userEmail"));
        }
        return (
            <div className="google-login">
                <p onClick={handleLogOut} className="google-logout-text">
                    Log out ({userEmailState})
                </p>

                <img
                    style={{ height: "2rem", paddingRight: "10px" }}
                    src={GoogleLogo}
                    alt="Edit"
                />
            </div>
        );
    };

    return (
        <>
            {authUser && alreadyLoggedIn()}
            {!authUser && (
                <div className="google-login" onClick={handleGoogleLogin}>
                    <p className="google-login-text">Log in with Google</p>
                    <img
                        style={{ height: "2rem", paddingRight: "10px" }}
                        src={GoogleLogo}
                        alt="Edit"
                    />
                </div>
            )}
        </>
    );
};

export default NavbarGoogleLogin;
