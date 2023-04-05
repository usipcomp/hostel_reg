import React from 'react'
import { Link } from 'react-router-dom';

const SubmittedApplications = () => {
    const applications = [
        {
            name: 'Ayush Gupta',
            roll: "2k21/ee/85",
            applied_on: '26/01/2023',
            app_id:123123,
        },
        {
            name: 'Ayush Gupta',
            roll: "2k21/ee/85",
            applied_on: '26/01/2023',
            app_id:232342,
        },
        {
            name: 'Ayush Gupta',
            roll: "2k21/ee/85",
            applied_on: '26/01/2023',
            app_id:21312412,
        },
    ];
    return (
        <div className='h-screen bg-[#f0ead2] w-full'>
            <div className="h-fit text-center bg-[#f0eaf9] font-bold text-3xl w-1/3 mx-auto mt-2">Submitted Applications</div>
            <div className="students_application_list flex flex-col w-4/5 my-3 h-fit m-auto bg-[#dde5b6] p-10 rounded-lg">
                {
                    applications.map((obj, ind) => {
                        return <Link to={`/student_application_view/${obj.app_id}`} className="text-xl bg-[#f0eaf9] w-3/4 block my-4 p-1 rounded flex flex-row" key={ind}>
                            <div className="stu_crendentials mr-auto">
                                <div className="stu_name_roll">
                                    {obj.name},{obj.roll.slice(0,4)}
                                </div>
                                <div className="applied_date">
                                    {obj.applied_on}
                                </div>
                            </div>
                            <div className="apply_operations flex flex-col">
                                <button>Accept</button>
                                <button>Reject</button>
                            </div>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default SubmittedApplications