import { Card, Skeleton } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getPaymentDetailHandler } from '../../services/handlers/payment-handlers'

const PrintPreview = () => {
  const router = useRouter()
  const { pid } = router.query

  const [isLoading, setIsLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [payment, setPayment] = useState({})  
  const fetch = async ()  => {
      try {
        setHasError(false)
        setIsLoading(true)
        const resp = await getPaymentDetailHandler({id: pid});
        console.log(resp)
        if(resp){
            setPayment(resp);
            setIsLoading(false)
        }
    }
     catch(e){ 
         console.log(e);
         setHasError(true)
         setIsLoading(false)
     }
  }
  useEffect(() => {
    fetch()
  }, [])

  return (
  <div className='px-8'>
  <Skeleton loading={isLoading} className="px-8">
    <Card className='m-8 mx-16'>
        <div className='text-end mb-4'>
            <p className='text-l'>Date : {moment().format('DD-MM-YYYY')}</p>
            <p className='text-l'>NO : {payment.id >= 10000 ? payment.id : `00${payment.id}`  }</p>
        </div>
    {
        payment.title &&  <p className='text-center text-2xl border-b-2'>{payment.title}</p>
    }
    </Card>
    
    </Skeleton>
    </div>)
}

export default PrintPreview 