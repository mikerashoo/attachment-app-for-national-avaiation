import { Layout } from "antd";
import Navbar from "./navbar";

export default function PageLayout({ children }) {
    return (
      <Layout className="h-screen bg-red-50" >
        <Navbar />
        <Layout className="h-full">{children}</Layout> 
      </Layout>
    )
  }

  