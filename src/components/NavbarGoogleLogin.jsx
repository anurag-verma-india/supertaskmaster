import GoogleLogo from "../assets/google.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useState } from "react";

const NavbarGoogleLogin = () => {
    const [authUser] = useAuthState(auth);
    const cookies = new Cookies(null, { path: "/" });
    const [userEmailState, setUserEmailState] = useState("");
    // const authUser = true;
    // const [authUser, setAuthUser] = useState(true);

    const handleGoogleLogin = () => {
        // setAuthUser(!authUser);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                console.log(result);
                console.log("Name\n", result.user.displayName);
                console.log("Email\n", result.user.email);
                toast.success("You logged in successfully", {
                    position: "top-center",
                });
                cookies.set("userEmail", result.user.email, { path: "/" });
                setUserEmailState(result.user.email);
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
    return (
        <>
            {authUser && (
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
            )}
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
