import React, {setGlobal} from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

setGlobal({
    isLoggedIn: false,
    app_key: "E4KK42LICWTGJT5JSSHJ",
    api: "https://www.eventbriteapi.com/v3/",
    fb_key: "652357228589073"
})

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
