import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context/AuthContext";

const EarningData = ({ setTotalAmount }) => {
  const { userId } = useGlobalContext();

  const [amountEarned, setAmountEarned] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-my-earning/${userId}`
        );

        if (response.data.userEarning) {
          const { totalAmount } = response.data.userEarning;
          let parsedTotalAmount = parseFloat(totalAmount);
          if (isNaN(parsedTotalAmount)) {
            parsedTotalAmount = 0.0;
          }

          setAmountEarned(parsedTotalAmount);
          // Pass the total amount to the parent component
          setTotalAmount(parsedTotalAmount.toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setTotalAmount]);

  return null; // Since this component doesn't render anything visible
};

export default EarningData;
