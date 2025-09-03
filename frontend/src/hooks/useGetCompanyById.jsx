import { setSingleCompany } from "@/redux/companySlice";
import { COMPANIES_JOB_END_POINT } from "../uttils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const usegetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANIES_JOB_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            }
            catch (error) {
                console.log(error)
            }
            FetchSingleCompany();
        }
    }, [companyId, dispatch])
}
export default usegetCompanyById;