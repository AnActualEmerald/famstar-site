import {useState} from 'react';


function ImageInput(props) {
    const [file, setFile] = useState();
    const sendImage = () => {
        const fd = new FormData();
        fd.append('imageFile', file);
        fetch('/api/image', {
            method: 'POST',
            headers: {'key':props.apiKey},
            body: fd
        });
    }
    return (
        <section>
            <label htmlFor="file">Image to upload:</label><br/>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/><br/>
            <button id="submit" onClick={sendImage}>Send</button>
        </section>
    );
}

export default ImageInput;