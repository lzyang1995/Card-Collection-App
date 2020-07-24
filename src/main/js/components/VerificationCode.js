import React from 'react';
import verification from 'verification-code';

import '../assets/css/VerficationCode.css';

class VerficationCode extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            dataUrl: null
        };
    }

    componentDidMount() {
        let result = verification.create();
        this.setState({
            dataUrl: result.dataURL
        });
        this.props.onClick(result.code)
    }

    handleClick() {
        let result = verification.create();
        this.setState({
            dataUrl: result.dataURL
        });
        this.props.onClick(result.code)
    }

    render() {
        return (
            <img 
                src={this.state.dataUrl} 
                onClick={this.handleClick} 
                className="verificationCodeImg"
                alt="验证码" 
                style={{
                    position: "absolute",
                    left: this.props.coordinate.left + "px",
                    top: this.props.coordinate.top + "px"
                }}
            />
        );
    }


}

export default VerficationCode;