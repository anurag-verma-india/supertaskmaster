import GoogleLogo from "../assets/google.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import Cookies from "universal-cookie";

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
                setUserEmailState(result.user.email);

                cookies.set("uid", result.user.uid);
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
            toast.success("You logged out successfully", {
                position: "top-center",
            });
            console.log("Logout successful");
            cookies.remove("userEmail");
            setUserEmailState("");
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
