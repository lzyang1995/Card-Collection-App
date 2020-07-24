import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import ModifyPasswordForm from './components/ModifyPasswordForm.js';

ReactDOM.render(
    <Framework>
        <ModifyPasswordForm />
    </Framework>,
    document.getElementById("react")
);