import React from 'react';
import { Result, Button } from 'antd';

function SuccessResponse(props) {
    return (
        <Result
            status="success"
            title={props.title}
            extra={[
                <Button type="primary" href={props.buttonUrl}>
                    {props.buttonText}
                </Button>
            ]}
        />
    );
}

export default SuccessResponse;