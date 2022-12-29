import { PrinterOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import PrintComponent from "../../components/attachment/PrintComponent"

const PrintPreview = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
  return (
  <div className='px-8'>
          
      <PrintComponent ref={componentRef} />
      <button onClick={handlePrint} title="Contact Sale"
        className="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300">
            <PrinterOutlined />
        </button>
 
    </div>)
}

export default PrintPreview 

