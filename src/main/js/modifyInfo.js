import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import ModifyInfoForm from './components/ModifyInfoForm.js';

ReactDOM.render(
    <Framework>
        <ModifyInfoForm />
    </Framework>,
    document.getElementById("react")
);