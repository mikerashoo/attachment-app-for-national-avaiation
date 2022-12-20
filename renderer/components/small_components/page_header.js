import { Divider } from "antd"

export const CustomPageHeader = ({title}) => {
    return ( 
    <div className="w-full mb-2 ">
    <h5 className="font-medium  w-full leading-tight text-xl mt-0 !mb-0 txt-primary">
                {title}
    </h5>
    </div>
    )
}