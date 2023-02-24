import { InfoOutlined } from '@ant-design/icons';

export const CustomPageHeader = ({title}) => {
    return ( 
    <div className="w-full mb-2 ">
    <h5 className="font-medium  w-full leading-tight text-xl mt-0 !mb-0 txt-primary">
                {title}
    </h5>
    </div>
    )
}


export const ManagementHeading = ({title, extraInformations, actionButtons}) => {
    return (
        <div className="lg:flex lg:items-center lg:justify-between mb-4">
            <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold leading-7 txt-primary">
                {title}
                </h2>
                {
                    extraInformations && <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            {
                                extraInformations.map((extra) => <div key={extra.key} className="mt-2 flex items-center text-sm text-gray-500"> 
                                    {extra.icon ? extra.icon : <InfoOutlined />}
                                    {
                                        extra.info
                                    }
                                </div>)
                            }
                        </div>
                } 
                </div>

                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                    {
                        actionButtons && actionButtons.map((actionButton) =>  <span key={actionButton.key} className="sm:ml-3">
                            {
                                actionButton
                            }
                        </span>
                        )
                    }
                </div> 
        </div>
    )
}