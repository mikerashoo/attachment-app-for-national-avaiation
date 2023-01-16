
import Image from 'next/image'
import React, { useState } from 'react'
import companyInformations from '../utils/company_information'
import logo from '../imgs/logo.png'
import { Button, Card, message } from 'antd'
import { exportDbHandler, importDBHandler } from '../services/handlers/export-import-handlers'
import ErrorAlert from '../components/small_components/error_alert'
const backup = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const exportDb = async () => {

    try { 
      setHasError(false)
      const data = await exportDbHandler();
      
      if(data != null){
        message.success("DB exported successfully!")
      }
    } catch (error) {
      setHasError(true);
      console.log(error)
      message.error("Something went wrong please try again!")
    }
  }
  const importDb = async () => {
    try { 
      setHasError(false)
      const data = await importDBHandler();
      
      if(data != null){
        message.success("DB imported successfully!")
      }
    } catch (error) {
      setHasError(true);
      console.log(error)
      message.error("Something went wrong please try again!")
    }
  }
  return (
	<Card loading={isLoading} className='text-center w-full h-full justify-center pt-16 px-16'>
		 <Image src={logo} width="400" height="300" />
            <div className="text-6xl font-bold"> {companyInformations.name}</div>
            <div className="text-3xl font-bold txt-success"> Attachment management software </div> 
            <div className="text-l font-bold txt-success mb-4"> Backup and restore</div> 
            {hasError && <div className='px-16 mx-16'> <ErrorAlert className="my-4" />  </div> }
        <Button className='bg-warning' size='large' onClick={exportDb}>Export Db</Button> 
        <Button className='bg-success ml-4' size='large' onClick={importDb}>Import Db</Button> 
    </Card>
  )
}

export default backup