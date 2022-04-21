import "./App.css";
import ImageInput from "./ImageInput";
import MessageInput from "./MessageInput";
import { useState } from "react";

function App() {
    const [selection, setSelection] = useState("image");
    const [key, setKey] = useState("");
    const update_selection = (e) => {
        setSelection(e.target.value);
    };

    return (
        <div className="App">
            <main>
                <h1>Send a message or a file!</h1>
                <form className="Input">
                    <fieldset className="inputHead">
                        <label htmlFor="Selection">I want to send </label>
                        <select
                            id="Selection"
                            onChange={update_selection}
                            value={selection}
                        >
                            <option value="image">an image</option>
                            <option value="message">a message</option>
                        </select>
                        <br />
                        <label htmlFor="apiKey">Password: </label>
                        <input
                            type="text"
                            id="apiKey"
                            onChange={(e) => setKey(e.target.value)}
                        />
                        <br />
                    </fieldset>
                    <fieldset className="inputFoot">
                        {selection === "image" ? (
                            <ImageInput apiKey={key} />
                        ) : (
                            <MessageInput apiKey={key} />
                        )}
                    </fieldset>
                </form>
            </main>
        </div>
    );
}

export default App;
