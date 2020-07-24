import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import IndexContent from './components/IndexContent.js';

ReactDOM.render(
    <Framework>
        <IndexContent />
    </Framework>,
    document.getElementById("react")
);