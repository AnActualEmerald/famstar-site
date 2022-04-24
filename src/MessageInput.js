import { useState } from "react";
import Notification from "rc-notification";

// let errorNotification = '';
// Notification.newInstance({style: {
//     'color':'white',
//     'position':'absolute',
//     'top':'50px',
//     'right':'50px',
//     'padding': '10px',
//     'borderRadius':'9px',
//     'backgroundColor':'red'
// }, duration: 5}, n => {
//     errorNotification = n;
// });
// let successNotification = '';
// Notification.newInstance({style:{
//     'color':'white',
//     'position':'absolute',
//     'top':'50px',
//     'right':'50px',
//     'padding': '10px',
//     'borderRadius':'9px',
//     'backgroundColor':'lightgreen'
// }});

// const ALERT = {
//     content: <span>Test Notif</span>
// }

function MessageInput(props) {
    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState("");
    const [temp, setTemp] = useState(0);
    const [date, setDate] = useState();

    const sendMessage = () => {
        const delete_after = `"deleteAfter": ${temp},`;
        fetch("/api/message", {
            method: "PUT",
            headers: { key: props.apiKey },
            body: `{${temp ? delete_after : ""} "content": "${msg}" }`,
        }).then((v) => {
            if (v.ok) {
                setAlert(
                    <p className="StatusAlert">
                        Status: <span style={{ color: "green" }}>OK!</span>
                    </p>
                );
                setDate(null);
                setMsg("");
                setTimeout(() => setAlert(""), 5000);
            } else {
                setAlert(
                    <p className="StatusAlert">
                        Status:{" "}
                        <span style={{ color: "red" }}>
                            Error! {v.status} - {v.statusText}
                        </span>
                    </p>
                );
                setTimeout(() => setAlert(""), 5000);
            }
        });
    };

    return (
        <section>
            <label className="tooltip" htmlFor="ephemeral">
                <span className="tooltiptext">
                    When the document should be deleted. Leave blank for a
                    permenant doc.
                </span>
                Delete after:
            </label>
            <input
                type="datetime-local"
                id="ephemeral"
                onChange={(e) => setTemp(e.target.valueAsNumber * 1000)}
                value={date}
            ></input>

            {/* <input
                type="number"
                id="ephemeral"
                onChange={(e) => setTemp(e.target.valueAsNumber)}
            /> */}
            <span> minutes</span>
            <br />
            <label htmlFor="message">Message to send:</label>
            <br />
            <textarea
                name="message"
                id="message"
                rows="10"
                cols="100"
                onChange={(e) => {
                    e.preventDefault();
                    setMsg(e.target.value);
                }}
                value={msg}
            ></textarea>
            <br />
            <button onClick={sendMessage} type="button" id="submit">
                Send
            </button>
            <br />
            {alert ? alert : ""}
        </section>
    );
}

export default MessageInput;
