import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/AuthContext";
import axios from "axios";

export const WithdrawHistoryData = () => {
	const { userId } = useGlobalContext();
	const [historyData, setHistoryData] = useState([]);
  
	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get(
			  `https://unleashified-backend.azurewebsites.net/api/v1/get-my-withdrawHistory/${userId}`
			);
	  
			// console.log(response.data); // Log response data
	  
			if (response.data.history && response.data.history.length > 0) {
			  const transformedData = response.data.history.map(item => ({
				id: formatId(item.id),
				status: item.status,
				amount: item.amount,
				invoice: item.invoice,
				date: formatDate(item.requestDate),
				method: "Bank",
				jobTitle: item.jobTitle,
			  }));
	  
			  setHistoryData(transformedData);
			} else {
			  console.log('No history found');
			}
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	  
		fetchData();
	  }, [userId]);
	  
  
	// Function to format the date
	const formatDate = dateString => {
	  const date = new Date(dateString);
	  const options = { month: 'long', day: 'numeric', year: 'numeric' };
	  return date.toLocaleDateString('en-US', options);
	};
  
	// Function to format the id with leading zeros
	const formatId = id => {
	  return id.toString().padStart(4, '0');
	};
  
	// Return the fetched data directly
	return historyData;
  };



// export const WithdrawHistoryData = [
// 	{
// 		id: 1060,
// 		status: 'Pending',
// 		amount: 1200,
// 		invoice: '10023',
// 		date: 'June 9, 2020',
// 		method: 'Amex',
// 		jobTitle: 'Frontend Developer'
// 	},
// 	{
// 		id: 1038,
// 		status: 'Paid',
// 		amount: 2000,
// 		invoice: '10020',
// 		date: 'June 9, 2020',
// 		method: 'Mastercard',
// 		jobTitle: 'Ui/Ux'
// 	},
// 	{
// 		id: 1016,
// 		status: 'Paid',
// 		amount: 3590,
// 		invoice: '10018',
// 		date: 'June 8, 2020',
// 		method: 'PayPal',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 1008,
// 		status: 'Paid',
// 		amount: 4500,
// 		invoice: '10003',
// 		date: 'June 9, 2020',
// 		method: 'Visa',
// 		jobTitle: 'Full Stack Developer'
// 	},
// 	{
// 		id: 1002,
// 		status: 'Paid',
// 		amount: 1232,
// 		invoice: '10020',
// 		date: 'June 7, 2020',
// 		method: 'Mastercard',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 982,
// 		status: 'Cancel',
// 		amount: 4500,
// 		invoice: '10018',
// 		date: 'June 8, 2020',
// 		method: 'PayPal',
// 		jobTitle: 'Full Stack Developer'
// 	},
// 	{
// 		id: 970,
// 		status: 'Paid',
// 		amount: 1232,
// 		invoice: '10003',
// 		date: 'June 6, 2020',
// 		method: 'Visa',
// 		jobTitle: 'Full Stack Developer'
// 	},
// 	{
// 		id: 965,
// 		status: 'Paid',
// 		amount: 4235,
// 		invoice: '10018',
// 		date: 'June 8, 2020',
// 		method: 'PayPal',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 953,
// 		status: 'Paid',
// 		amount: 1231,
// 		invoice: '10003',
// 		date: 'June 6, 2020',
// 		method: 'Visa',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 943,
// 		status: 'Paid',
// 		amount: 5435,
// 		invoice: '10010',
// 		date: 'June 5, 2020',
// 		method: 'Visa',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 933,
// 		status: 'Pending',
// 		amount: 2435,
// 		invoice: '10009',
// 		date: 'June 5, 2020',
// 		method: 'PayPal',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 921,
// 		status: 'Cancel',
// 		amount: 3590,
// 		invoice: '10008',
// 		date: 'June 5, 2020',
// 		method: 'Amex',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 853,
// 		status: 'Paid',
// 		amount: 1231,
// 		invoice: '10007',
// 		date: 'June 4, 2020',
// 		method: 'Amex',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 844,
// 		status: 'Paid',
// 		amount: 4235,
// 		invoice: '10006',
// 		date: 'June 4, 2020',
// 		method: 'Amex',
// 		jobTitle: 'Data Analyst'
// 	},
// 	{
// 		id: 816,
// 		status: 'Paid',
// 		amount: 5435,
// 		invoice: '10005',
// 		date: 'June 4, 2020',
// 		method: 'Amex',
// 		jobTitle: 'Data Analyst'
// 	}
// ];

// export default WithdrawHistoryData;
