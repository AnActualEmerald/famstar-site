import {useState} from 'react';
import Notification from 'rc-notification';

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
    const [msg, setMsg] = useState('');
    const [alert, setAlert] = useState('');
    // const [error, errHolder] = errorNotification.useNotification();
    // const [success, succHolder] = successNotification.useNotification();

    const sendMessage = () => {
        fetch('/api/message', {
            method: 'PUT',
            headers: {'Content-Type':'application/json', 'key':props.apiKey},
            body: `{
                "content": "${msg}"
            }`
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
        });
    }

    return(
        <section>
            <label htmlFor="message">Message to send:</label><br/>
            <textarea name="message" id="message" rows='10' cols='100' onChange={(e) => setMsg(e.target.value)} value={msg}></textarea><br/>
            <button onClick={sendMessage} type="button" id="submit">Send</button><br/>
            <p className='StatusAlert'>{alert ? alert : ''}</p>
        </section>
    );
}

export default MessageInput;