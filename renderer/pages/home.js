
import Image from 'next/image'
import React from 'react'
import companyInformations from '../utils/company_information'
import logo from '../imgs/logo.png'
function home() {
  return (
	<div className='text-center w-full h-full justify-center pt-16 '>
		 <Image src={logo} width="400" height="400" />
            <div className="text-8xl font-bold"> {companyInformations.name}</div>
            <div className="text-4xl font-bold txt-success"> Attachment management software </div>
	</div>
  )
}

export default home