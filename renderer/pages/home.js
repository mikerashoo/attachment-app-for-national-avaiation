import React, { useEffect } from 'react'; 

import { Button, Layout } from 'antd'; 
import PageLayout from '../components/layouts/PageLayout';
import { addPaymentHandler, checkAndInitializePaymentTypes } from '../services/handlers/payment-handlers';
const { Content } = Layout; 
 
const Home = () => { 


    useEffect(() => {
        checkForPaymentTypes();
     }, [])
     
     const checkForPaymentTypes = async () => {
       console.log('Checking for===============')
       const pays =  await checkAndInitializePaymentTypes();
       console.log("Pays", pays);
     }

     const addTest = async () => {
        try {
          const res = await addPaymentHandler()
        } catch (error) {
          console.log(error)
        }
     }
    return (
   <PageLayout>
		<Layout className='mx-8 px-8 py-4 h-full my-4'>
			 
				<Content className='p-4 bg-white ml-2'> 
					<div>
						<h1>Home Page</h1>
            <Button onClick={addTest}>Add Test Payment</Button>
					</div>
				</Content> 
		</Layout> 
    </PageLayout>
  );
}

export default Home;
// 