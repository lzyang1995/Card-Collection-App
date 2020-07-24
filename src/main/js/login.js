import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import LoginForm from './components/LoginForm.js';

ReactDOM.render(
    <Framework>
        <LoginForm />
    </Framework>,
    document.getElementById("react")
);