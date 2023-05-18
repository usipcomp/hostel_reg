import React from 'react'

function Alert(props) {
    const formatAlert = (type)=>{
        if (type==="danger") type = "error";
        const newType = (type.split(''))[0].toUpperCase();
        return newType.concat(type.slice(1,type.length));
    }
    return (
        <div style={{ height: `3rem`,marginTop:'3rem' }}>
            {props.alert && <div className={`alert alert-${props.alert.alertType} alert-dismissible fade show z-index-1`} role="alert">
                <strong>{formatAlert(props.alert.alertType)}</strong> : {props.alert.msg}
            </div>}
        </div>
    )
}

export default Alert