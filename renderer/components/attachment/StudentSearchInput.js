import { Select } from "antd";
import { useState } from "react";
import { searchStudentByIdHandler } from "../../services/handlers/student-handler";

let timeout;
let currentValue;

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
			const selectableStudents = searchResults.map((student) => ({
				 
				value: student.id,
				text: student,
			  }));

			  console.log(selectableStudents);
	
			if (currentValue === value) {
				 
				callback(selectableStudents)
			}
		} catch (error) {
			console.log(error);
		}
	 
	};
	timeout = setTimeout(apiCall, 300);
  };

  const SearchInput = (props) => {
	const [data, setData] = useState([]);
	const [value, setValue] = useState();
	const handleSearch = async (newValue) => {
	  if (newValue) {
		 searchStudent(newValue, setData);
	  } else {
		setData([]);
	  }
	};
	const handleChange = (newValue) => {  
		const _student = data.find((student) => student.id === newValue);
		console.log("student", _student)
        // props.onStudentSelected();

	    setValue(newValue);

	};
	return (
	  <Select
		showSearch
		value={value}
		placeholder={props.placeholder}
		style={props.style}
		defaultActiveFirstOption={false}
		showArrow={false}
		filterOption={false}
		onSearch={handleSearch}
		onChange={handleChange}
		notFoundContent={<p>No student found</p>}>
		{
			(data || []).map((d) => <Select.Option key={d.value} value={d.value}><b>{d.text.collageId}</b> | {d.text.name}</Select.Option>)
		}
	  </Select>
	);
  };

  export default SearchInput;