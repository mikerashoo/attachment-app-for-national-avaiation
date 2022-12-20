import { Layout } from "antd";
import Navbar from "./navbar";

export default function PageLayout({ children }) {
    return (
      <Layout className="h-screen" style={{backgroundColor: "transparent"}}>
       
        <Layout className="h-full px-8 py-4">{children}</Layout> 
      </Layout>
    )
  }

  