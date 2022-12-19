import { Alert, Space } from "antd";
import { GENERAL_ERROR_MESSAGE } from "../utils/error_messages";

const ErrorAlert = ({message = GENERAL_ERROR_MESSAGE}) => 
    <Space direction="vertical" style={{ width: '100%' }} className="my-2"> 
    <Alert message={message} type="error" />
  </Space>

export default ErrorAlert;