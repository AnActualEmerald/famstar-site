import {useState} from 'react';


function ImageInput(props) {
    const [file, setFile] = useState();
    const [alert, setAlert] = useState('');
    const sendImage = () => {
        const fd = new FormData();
        fd.append('imageFile', file);
        fetch('/api/image', {
            method: 'POST',
            headers: {'key':props.apiKey},
            body: fd
        }).then((v) => {
            if (v.ok) {
                setAlert('Status: OK!')
                setTimeout(() => setAlert(''), 5000);
                // successNotification.notice({content:<span>Success!</span>, duration: 5, closable: true});
            }else {
                setAlert(`Status: Error! ${v.status} - ${v.statusText}`);
                setTimeout(() => setAlert(''), 5000);
                // errorNotification.notice({content:<p>Failure!</p>, duration: 5, closable: true});

            }
        });;
    }
    return (
        <section>
            <label htmlFor="file">Image to upload:</label><br/>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/><br/>
            <button id="submit" onClick={sendImage}>Send</button>
            <p className='StatusAlert'>{alert ? alert : ''}</p>
        </section>
    );
}

export default ImageInput;