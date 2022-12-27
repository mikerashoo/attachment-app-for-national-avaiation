import React from 'react'
import PageLayout from '../components/layouts/PageLayout'

const PageNotFound = () => {
  return (
    <PageLayout>
        <div className='text-center my-16 h-full'>
        <h1 className="text-red-500 text-lg" >404 | Page Not Found</h1>
        </div>
    </PageLayout>
  )
}

export default PageNotFound