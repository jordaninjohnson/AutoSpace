import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

function message(info) {
    store.addNotification({
        message: info[0],
        type: info[1],
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", info[2]],
        animationOut: ["animate__animated", info[3]],
        dismiss: {
            duration: 1500
        }
    });
}

export default message;