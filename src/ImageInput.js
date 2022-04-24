import { useState } from "react";

function ImageInput({ apiKey, reset }) {
    const [file, setFile] = useState();
    const [alert, setAlert] = useState("");
    const [temp, setTemp] = useState(0);
    const [date, setDate] = useState();

    const sendImage = (e) => {
        e.preventDefault();
        const headers = {
            key: apiKey,
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
                setDate(null);
                document.getElementById("fileForm").reset();
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
                type="date"
                id="ephemeral"
                onChange={(e) => {
                    const t = e.target.valueAsDate;
                    //midnight of the next day
                    t.setDate(t.getDate() + 1);
                    t.setHours(24, 0, 0, 0);
                    //send the difference between now and then to get around any timezone issues
                    setTemp((t.getTime() - Date.now()) * 1000);
                }
                }
                value={date}
            ></input>
            <br />
            <form id="fileForm">
            <label htmlFor="file">Image to upload:</label>
            <br />
            <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                
            />
            </form>
            <br />
            <button id="submit" onClick={sendImage}>
                Send
            </button>
            {alert ? alert : ""}
        </section>
    );
}

export default ImageInput;
