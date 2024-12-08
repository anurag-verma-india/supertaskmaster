import { onValue, ref, get, set, child } from "firebase/database"
import { db } from "./firebase"
import Cookies from "universal-cookie";
const cookies = new Cookies(null, {
    path: "/",
    maxAge: 1000 * 365 * 24 * 60 * 60,
});

// Does not work for some reason
// function getUserFromUID(uid) {
//     const userRef = ref(db)
//     get(child(userRef), `user/${uid}`).then((snapshot) => {
//         if (snapshot.exists()) {
//             const userObjToReturn = snapshot.val()
//             console.log(userObjToReturn);
//             return userObjToReturn
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error("Error getting the user value\n", error);
//     });
// }

// This works
function writeUserData(userData) {
    set(ref(db, 'user/' + 'userid'), { username: "samplesam", email: "sam@email.com" })
}

// This works but does not return the correct thing
function updateUserFromUID(uid) {
    const userRef = ref(db, "user/" + uid)

    onValue(userRef, (snapshot) => {
        const userObj = snapshot.val();

        // cookies.set("userEmail", userObj.email)
        // cookies.set("userName", userObj.userName)
        // cookies.set("userList0", userObj.taskLists[0])
        // cookies.set("userList1", userObj.taskLists[1])
        // cookies.set("userList2", userObj.taskLists[2])
        // cookies.set("userList3", userObj.taskLists[3])

        console.log("userObj\n", userObj)
        return snapshot.val()
        // userObjToReturn = userObj
        // return userObjToReturn;
    })
}

export { updateUserFromUID, writeUserData }