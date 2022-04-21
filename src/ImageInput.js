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
                    When the document should be deleted. Leave blank for a permenant doc.
                </span>
                Delete after:
            </label>
            <input type="datetime-local" id="ephemeral"  onChange={(e) => setTemp(e.target.valueAsNumber * 1000)}></input>
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
