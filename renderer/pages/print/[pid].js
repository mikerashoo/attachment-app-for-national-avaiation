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

  return (<Skeleton loading={isLoading} className="p-8">
    <Card className='m-8'>
        <div className='text-end'>
            <p>{moment().format('DD-MM-YYYY')}</p>
        </div>
    {
        payment.title &&  <h1 className='text-center text-lg'>{payment.title}</h1>
    }
    </Card>
    
    </Skeleton>)
}

export default PrintPreview 