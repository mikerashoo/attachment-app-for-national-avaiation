import React from 'react'

function DepartementManagement() {
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [departements, setDepartements] = useState([])  
     const fetch = async ()  => {
        try {
            setHasError(false)
            setLoading(true)
            // const resp = await fetchDepartements();
            // if(resp){
            //     setDepartements(resp);
            //     setLoading(false)
            // }
        }
        catch(e){ 
            console.log(e);
            setHasError(true)
            setLoading(false)
        }
    }
    useEffect(() => {
      fetch()
    }, [])
  return (
    <div>DepartementManagement</div>
  )
}

export default DepartementManagement