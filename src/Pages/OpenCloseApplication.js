import React from 'react'

const OpenCloseApplication = () => {
    return (
        <>  
            <div className="open_close_application bg-[#dde5b6] w-3/4 h-fit mx-auto mt-5 p-3 text-2xl">
                <div className="window flex flex-col ml-5">
                    <h2 className='self-center font-bold underline mb-3 text-3xl'>Currently Active Applications</h2>
                    <div className="start_date bg-[#f0eaf9]">Started On:01/01/2023</div>
                    <div className="last_date_to_apply bg-[#f0eaf9] my-1">Last Date To Apply:02/02/2023</div>
                    <div className="admission_year bg-[#f0eaf9] my-1">Admission Year:2023,2022</div>
                    <div className="num_of_apps_received bg-[#f0eaf9] my-1">Number of Applications Received : 2000</div>
                    <button className='bg-sky-300 rounded-full w-1/4 my-1'>View All Applications</button>
                    <button className='bg-sky-300 rounded-full w-1/4 my-1'>Close Applications</button>
                </div>
            </div>
        </>
    )
}

export default OpenCloseApplication