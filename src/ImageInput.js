import { useState } from "react";

function ImageInput(props) {
    const [file, setFile] = useState();
    const [alert, setAlert] = useState("");
    const [temp, setTemp] = useState(0);

    const sendImage = (e) => {
        e.preventDefault();
        const headers = {
            key: props.apiKey,
        };
        if (temp) {
            headers["Delete-After"] = temp;
        }
        const fd = new FormData();
        fd.append("imageFile", file);
        fetch("/api/image", {
            method: "POST",
            headers,
            body: fd,
        }).then((v) => {
            if (v.ok) {
                setAlert(
                    <p className="StatusAlert">
                        Status: <span style={{ color: "green" }}>OK!</span>
                    </p>
                );
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
                    How many minutes after sending should this message be
                    deleted. Leave 0 or blank for infinite.
                </span>
                Delete after:
            </label>
            <input
                type="number"
                id="ephemeral"
                onChange={(e) => setTemp(e.target.valueAsNumber)}
            />
            <span> minutes</span>
            <br />
            <label htmlFor="file">Image to upload:</label>
            <br />
            <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <button id="submit" onClick={sendImage}>
                Send
            </button>
            {alert ? alert : ""}
        </section>
    );
}

export default ImageInput;
