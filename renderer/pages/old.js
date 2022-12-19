
    // const onCreateUser = async () => {
    //     try{
    //         const data = {
    //             name: "Mikiysda",
    //             email: "mkds@test.com"
    //         }
    //         const addUser = await userOperations.create(data); 
    //         console.log("addUser", addUser)
    //         const user = JSON.parse(addUser); 
    //         const _users = [...users, user]
    //         setUsers(_users)
    //     }catch(e){ 
    //         console.log("Ee", e)
    //         setError("Something went wrong. Please try again");
    //     } 
    //   };
      
    //   const fetchUser = async () => { 
    //     try{
    //         const response = await userOperations.all(); 
    //         const users =  JSON.parse(response);
    //         console.log(users);
    //         setUsers(users);
    //     }catch(e){
    //         console.log("e====================> : ", e)
    //         setError("Something went wrong. Please try again");
    //     } 
    //   }
 
    //   useEffect(() => {
    //    fetchUser();

    //   }, [])

    //   const [users, setUsers] = useState([])
    //   const [error, setError] = useState('')