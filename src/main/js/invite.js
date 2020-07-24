import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import InviteContent from './components/InviteContent.js';

ReactDOM.render(
    <Framework>
        <InviteContent />
    </Framework>,
    document.getElementById("react")
);