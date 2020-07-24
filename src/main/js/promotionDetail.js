import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import PromotionDetailContent from './components/PromotionDetailContent.js';

ReactDOM.render(
    <Framework>
        <PromotionDetailContent />
    </Framework>,
    document.getElementById("react")
);