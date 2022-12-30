
import Image from 'next/image'
import React from 'react'
import companyInformations from '../utils/company_information'
import logo from '../imgs/logo.png'
import { Button } from 'antd'
import { exportDbHandler } from '../services/handlers/export-import-handlers'
function home() {
    const exportDb = () => {
        exportDbHandler();
    }
  return (
	<div className='text-center w-full h-full justify-center pt-16 '>
		 <Image src={logo} width="400" height="400" />
            <div className="text-6xl font-bold"> {companyInformations.name}</div>
            <div className="text-3xl font-bold txt-success"> Attachment management software </div>
        <Button className='bg-warning' onClick={exportDb}>Export Db</Button>
    </div>
  )
}

export default home