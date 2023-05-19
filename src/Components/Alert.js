import React from 'react'

function Alert(props) {
    const formatAlert = (type) => {
        if (type === "danger") type = "error";
        const newType = (type.split(''))[0].toUpperCase();
        return newType.concat(type.slice(1, type.length));
    }
    console.log(props)
    return (
        <>

            {props.alert && <div className={`bg-${props.alert.theme==="success"?"green-500":"red-500"} text-center py-4 lg:px-4`}>
                <div className={`p-2 bg-${props.alert.theme==="success"?"green-900":"red-900"} items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex`} role="alert">
                    <span className={`flex rounded-full bg-${props.alert.theme==="success"?"green-700":"red-700"} uppercase px-2 py-1 text-xs font-bold mr-3`}>{formatAlert(props.alert.theme)}</span>
                    <span className={`font-semibold mr-2 text-left flex-auto bg-${props.alert.theme==="success"?"green-700":"red-700"}`}>{props.alert.message}</span>
                    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
                </div>
            </div>}
        </>
    )
}

export default Alert