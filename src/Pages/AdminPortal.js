import React from 'react'
import { Link } from 'react-router-dom'

const AdminPortal = () => {
    const user = "Ayush Gupta"
    return (
        <>
            <div className="admin_portal bg-[#f0ead2] w-full h-screen">
                <div className="admin_portal_window flex">
                    <div className="first_row h-fit m-auto mt-5 bg-[#dde5b6] w-1/1 p-10 rounded-lg flex">
                        <div className="font-bold bg-[#f0eaf9] p-2 mx-2 text-3xl my-4">Hostel Reg.</div>
                        <Link to="/open_close_applications" className="font-bold bg-[#f0eaf9] p-2 mx-2 text-3xl my-4">Open/Close Applications</Link>
                        <Link to="/submitted_applications" className="font-bold bg-[#f0eaf9] p-2 mx-2 text-3xl my-4">Submitted Applications</Link>
                    </div>
                {/* below is the namelist of students */}
                </div>
                <div className="student_list h-fit m-auto mt-5 bg-[#dde5b6] w-1/1 p-10 rounded-lg">
                    <div className="admin bg-[#f0eaf9] text-xl w-fit p-1">
                        {user}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPortal