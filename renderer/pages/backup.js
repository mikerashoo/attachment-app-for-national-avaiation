
import Image from 'next/image'
import React from 'react'
import companyInformations from '../utils/company_information'
import logo from '../imgs/logo.png'
import { Button } from 'antd'
import { exportDbHandler, importDBHandler } from '../services/handlers/export-import-handlers'
function backup() {
  const exportDb = () => {
      exportDbHandler();
  }
  const importDb = () => {
    importDBHandler();
  }
  return (
	<div className='text-center w-full h-full justify-center pt-16 '>
		 <Image src={logo} width="400" height="300" />
            <div className="text-6xl font-bold"> {companyInformations.name}</div>
            <div className="text-3xl font-bold txt-success"> Attachment management software </div> 
            <div className="text-l font-bold txt-success mb-4"> Backup and restore</div> 
        <Button className='bg-warning' size='large' onClick={exportDb}>Export Db</Button> 
        <Button className='bg-success ml-4' size='large' onClick={importDb}>Import Db</Button> 
    </div>
  )
}

export default backup