import {useState} from 'react';

function MessageInput(key) {
    const [msg, setMsg] = useState('');

    const sendMessage = () => {
        fetch('/message', {
            method: 'PUT',
            headers: {'Content-Type':'application/json', 'key':key},
            body: {
                content: msg
            }
        });
    }

    return(
        <section>
            <label htmlFor="message">Message to send:</label><br/>
            <textarea name="message" id="message" rows='20' cols='100' onChange={(e) => setMsg(e.target.value)} value={msg}></textarea>
            <button type="reset" onClick={sendMessage}>Send</button>
        </section>
    );
}

export default MessageInput;