import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Col, 
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Radio,
  Row,
  Select,
  Skeleton,
} from "antd";
import PageLayout from "../components/layouts/PageLayout";
import {
  addPaymentHandler, 
  fetchPaymentFormsForDepartement,
  savePaymentHandler,
} from "../services/handlers/payment-handlers";
import { 
	getStudentPaymentFormInformationHandler,
  getStudentsWithLessDataHandler,
  searchStudentByIdHandler,
} from "../services/handlers/student-handler"; 
import { useRouter } from "next/router";
import SearchInput from "../components/attachment/StudentSearchInput";
import ErrorAlert from "../components/small_components/error_alert";
const { Content } = Layout;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const plainOptions = ["CASH", "BANK", "CHECK"];

let timeout;
let currentValue;

const AttachmentPage = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [hasError, sethasError] = useState(null);
  const [isStudentsLoading, setIsStudentLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentTypeLoading, setIsPaymentTypeLoading] = useState(false);
  const [paymentForms, setPaymentForms] = useState([]);
  const [student, setStudent] = useState(null);
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [paymentWay, setPaymentWay] = useState("BANK");
  const [hasPenality, setHasPenality] = useState(false);

  useEffect(() => { 
    form.setFieldsValue({
      paymentWay: "BANK",
    });
  }, []);
 
  const onStudentSearchResult = (_students) => {
	setStudents(_students)
  }
 

  const onSubmit = async (values) => {
    try {
      if (
        values.selectedPaymentForms === undefined ||
        values.selectedPaymentForms.length === 0
      ) {
        message.error("Please select atleast one payment");
        return;
      }
      setIsLoading(true);
      const data = { ...values, title };
      console.log("data submitted", data);
      const response = await savePaymentHandler(data);

      if (response) {
        message.success("Payment saved succesfully");
        const path = "/print/" + response.id;
        router.push(path);
        setIsLoading(false);
        form.resetFields();
        setPaymentForms([]);
        form.setFieldsValue({
          paymentWay: "BANK",
        });
        setPaymentWay("BANK");
        setStudent(null);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      message.error("Something went wrong please try again");
    }
  };

  const onStudentSelected = async (sId) => {
    try {
      setIsLoading(true);
	  sethasError(false)
	  const data = {studentId: sId};
      const studentResponse = await getStudentPaymentFormInformationHandler(data);
      console.log("student", studentResponse);
      if (studentResponse) { 
        setIsLoading(false);
		setStudent(studentResponse); 
		setPaymentForms(studentResponse.paymentForms)
      }
    } catch (error) { 
		console.log("student error", error);
      setIsLoading(false);
      sethasError(true);
    }

  };
 
  const onPaymentFormChange = (selectedForms) => {
    const penality = form.getFieldValue("penality")
      ? parseFloat(form.getFieldValue("penality"))
      : 0;
    const _title = "";
    for (const pFormId of selectedForms) {
      const paymentF = paymentForms.find((pForm) => pForm.id === pFormId);
      if (_title.length == 0) {
        _title += paymentF.title;
      } else {
        _title += ` & ${paymentF.title}`;
      }
    }

    setTitle(_title);
    calculateTotal(selectedForms, penality);
    console.log(selectedForms);
  };

  const onPenalityChange = (penality) => {
    const selectedForms = form.getFieldValue("selectedPaymentForms");
    calculateTotal(selectedForms, penality);
  };

  const calculateTotal = (selectedForms, penality) => {
    const _total = penality;

    for (const pFormId of selectedForms) {
      const paymentF = paymentForms.find((pForm) => pForm.id === pFormId);
      const depPayment = student.departement.departementPaymentPrices.find(
        (dP) => dP.paymentTypeId === paymentF.paymentTypeId
      );
      let price = depPayment.price; 
      if ( student.discount != null && student.discount > 0 && paymentF.paymentType.isPaymentWay) {
        let discountAmount = 100 - parseInt(student.discount);
        let percentMultiplier = discountAmount / 100;
        price = price * percentMultiplier;
		console.log("price	", price);
      }
      _total += parseFloat(price);
    }

    form.setFieldsValue({
      total: _total,
    });
  };

  const onPaymentWayChange = ({ target: { value } }) => {
    setPaymentWay(value);
  };

  const onHasPenalityChange = ({ target: { checked } }) => {
    setHasPenality(checked);
  };

  const handleSearch = async (newValue) => {
	if (newValue) {
	   searchStudent(newValue, setStudents);
	} else {
	  setStudents([]);
	}
  };
  const handleStudentChange = (newValue) => {   
	  onStudentSelected(newValue);
  };


const searchStudent = (value, callback) => {
	if (timeout) {
	  clearTimeout(timeout);
	  timeout = null;
	}
	currentValue = value;
	const apiCall = async () => {
		

		try {
			const data = {
				searchId: value
			}
			const searchResults = await searchStudentByIdHandler(data)
			  
			if (currentValue === value) {
				 
				callback(searchResults)
			}
		} catch (error) {
			console.log(error);
		}
	 
	};
	timeout = setTimeout(apiCall, 300);
  };
  return (
    <PageLayout>
      <Layout className="mx-8 px-8 py-4 h-full my-4">
        <Content className="p-4 bg-white ml-2 px-8">
          <Skeleton loading={isPaymentTypeLoading || isStudentsLoading}>
            <div>
			{hasError && <ErrorAlert className="my-4" />  }
              {/* <h1>New Attachment</h1> */}
              <Form
                {...formItemLayout}
                form={form}
                size="large"
                layout="vertical"
                onFinish={onSubmit}
              >
                {/* <h2 className='text-bold'> Title : {title}</h2> */}
                <Card title={title} loading={isLoading}>
                  <Row>
                    <Col span={14}>
					<Form.Item
                        className="w-full"
                        label="Student"
                        name="studentId"
                        rules={[{ required: true }]}
                      >
						<Select
							showSearch
							// value={value}
							placeholder="Search student by id" 
							defaultActiveFirstOption={false}
							showArrow={false}
							filterOption={false}
							onSearch={handleSearch}
							onChange={handleStudentChange}
							notFoundContent={<p>No student found</p>}>
							{
								(students || []).map((student) => <Select.Option key={student.id} value={student.id}><b>{student.collageId}</b> | {student.name}</Select.Option>)
							}
						</Select>
						{/* <SearchInput onStudentSelected={onStudentSelected} onStudentSearchResult={} placeholder="Search student by id"/> */}
						</Form.Item>
                      {/* <Form.Item
                        className="w-full"
                        label="Student"
                        name="studentId"
                        rules={[{ required: true }]}
                      >
                        <Select
                          className="w-full"
                          onChange={onStudentSelected}
                          placeholder="Select student"
                        >
                          {students.map((student) => (
                            <Select.Option value={student.id} key={student.id}>
                              {student.collageId} | {student.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item> */}
                      {student && (
                        <>
                          <Form.Item
                            required
                            label="Select payments"
                            id="payment-forms-group"
                            name="selectedPaymentForms"
                          >
                            <Checkbox.Group
                              onChange={onPaymentFormChange}
                              className="w-full vertical-checkbox"
                            >
                              {paymentForms.map((paymentF) => {
							   const depPayment = student.departement.departementPaymentPrices.find((dP) => dP.paymentTypeId === paymentF.paymentTypeId );
                                const price = depPayment.price;
                                let hasDiscount = false;
                                if (
                                  student.discount != null &&
                                  student.discount > 0 &&
                                  paymentF.paymentType.isPaymentWay
                                ) {
                                  
                                  const discountAmount =
                                    100 - parseInt(student.discount);
                                  const percentMultiplier =
                                    discountAmount / 100;
                                  price = price * percentMultiplier;
                                  hasDiscount = true;
                                }
                                return (
                                  depPayment && (
                                    <Row key={paymentF.id}>
                                      <Checkbox
                                        name={paymentF.id}
                                        value={paymentF.id}
                                      >
                                        {" "}
                                        {paymentF.title} :{" "}
                                        <b className="txt-primary">
                                          {price} birr{" "}
                                          {hasDiscount && (
                                            <span className="txt-warning">
                                              Has {student.discount}% discount
                                            </span>
                                          )}{" "}
                                        </b>
                                      </Checkbox>
                                    </Row>
                                  )
                                );
                              })}
                            </Checkbox.Group>
                          </Form.Item>
                          <Checkbox
                            name="hasPenality"
                            onChange={onHasPenalityChange}
                            value={hasPenality}
                          >
                            {" "}
                            Has Penality
                          </Checkbox>

                          {hasPenality && (
                            <Form.Item
                              label="Penality"
                              name="penality"
                              className="w-full"
                              rules={[{ required: true }]}
                            >
                              <InputNumber
                                placeholder="0"
                                onChange={onPenalityChange}
                                className="w-full"
                              />
                            </Form.Item>
                          )}

                          <Form.Item
                            label="Total"
                            name="total"
                            className="w-full"
                          >
                            <Input
                              type="text"
                              defaultValue={0}
                              className="w-full"
                            />
                          </Form.Item>
                        </>
                      )}
                    </Col>
                    <Col span={10} className=" px-8">
                      <Card>
                        <Form.Item
                          label="Attachment No."
                          name="attachmentNo"
                          rules={[{ required: true }]}
                        >
                          <Input type="text" />
                        </Form.Item>
                        <Form.Item
                          rules={[{ required: true }]}
                          label="Payment way"
                          id="payment-radio-group"
                          name="paymentWay"
                        >
                          <Radio.Group
                            options={plainOptions}
                            onChange={onPaymentWayChange}
                            value={paymentWay}
                          />
                        </Form.Item>
                        {paymentWay == "CHECK" && (
                          <Form.Item
                            rules={[{ required: true }]}
                            label="Check No"
                            id="payment-radio-group"
                            name="checkNo"
                          >
                            <Input placeholder="Enter check no" />
                          </Form.Item>
                        )}
                      </Card>
                    </Col>
                  </Row>
                </Card>

                <Form.Item className="mt-4">
                  <Button
                    className="bg-primary"
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >
                    Save & Print{" "}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Skeleton>
        </Content>
      </Layout>
    </PageLayout>
  );
};

 
export default AttachmentPage;
//
