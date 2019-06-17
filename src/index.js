import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import  './api/index'
import memeoryUtils from './utils/memoryUtils'
import {getUser} from './utils/storageUtils'

const user = getUser()
memeoryUtils.user = user


ReactDOM.render(<App />, document.getElementById('root'));


