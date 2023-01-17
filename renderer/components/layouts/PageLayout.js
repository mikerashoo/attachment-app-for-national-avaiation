import { Layout } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { loginUser, useAuthDispatch, useAuthState } from "../../auth";
import { USER_LOGGIN_KEY } from "../../utils/constants";
import Navbar from "./navbar";

export default function PageLayout({ children }) {

  const userAuth = useAuthState();
  const dispatch = useAuthDispatch();
   const router = useRouter();

  useEffect(() => {
    
      let user = localStorage.getItem(USER_LOGGIN_KEY)
      ? JSON.parse(localStorage.getItem(USER_LOGGIN_KEY))
      : null;
      console.log(user);
      if(user){
         loginUser(dispatch, user) 
      }
      else {
        router.replace("/")
      }

  }, [])

  if(!userAuth.user)
  return <div className="text-center"> 
    Loading ....
  </div>
    return (
      <Layout className="h-full" style={{backgroundColor: "transparent"}}>
       
        <Layout className="h-full px-8 py-4">{children}</Layout> 
      </Layout>
    )
  }

   