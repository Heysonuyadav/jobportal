import { setCompanies } from "../redux/companySlice";
import { COMPANIES_JOB_END_POINT } from "../uttils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANIES_JOB_END_POINT}/getcompany`,{ withCredentials: true });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        if(error.response)
        {

        } else if (error.request){
          console.log("No Response received:",error.request);
        } else{
          console.log("Error:",error.message);
        }
      }
    };

    fetchCompanies(); 
  }, [companyId, dispatch]); 
};

export default useGetAllCompanies;
