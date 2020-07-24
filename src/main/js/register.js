import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import RegisterForm from './components/RegisterForm.js';

ReactDOM.render(
    <Framework>
        <RegisterForm />
    </Framework>,
    document.getElementById("react")
);