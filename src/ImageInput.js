import {useState} from 'react';


function ImageInput(key) {
    const [file, setFile] = useState();
    const sendImage = () => {
        const fd = new FormData();
        fd.set('file', file)
        fetch('/image', {
            method: 'POST',
            headers: {'Content-Type':'multipart/form-data', 'key':key},
            body: fd
        });
    }
    return (
        <section>
            <label htmlFor="file">Image to upload:</label>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/><br/>
            <button type="reset" onClick={sendImage}>Send</button>
        </section>
    );
}

export default ImageInput;