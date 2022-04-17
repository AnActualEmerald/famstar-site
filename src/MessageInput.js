import {useState} from 'react';

function MessageInput(props) {
    const [msg, setMsg] = useState('');

    const sendMessage = () => {
        fetch('/api/message', {
            method: 'PUT',
            headers: {'Content-Type':'application/json', 'key':props.apiKey},
            body: `{
                "content": "${msg}"
            }`
        });
    }

    return(
        <section>
            <label htmlFor="message">Message to send:</label><br/>
            <textarea name="message" id="message" rows='10' cols='100' onChange={(e) => setMsg(e.target.value)} value={msg}></textarea><br/>
            <button onClick={sendMessage} type="button" id="submit">Send</button>
        </section>
    );
}

export default MessageInput;