import { Image } from 'antd'
import React from 'react'
import companyInformations from '../components/utils/company_information'
import logo from '../imgs/logo.png'

function home() {
  return (
	<div className='text-center w-full h-full justify-center'>
		 <Image src={logo} width="50" height="50" />
            <div className="text-2xl font-bold"> {companyInformations.name}</div>
	</div>
  )
}

export default home