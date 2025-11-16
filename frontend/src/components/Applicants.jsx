import React, { useEffect } from 'react';
import NavBar from './shared/NavBar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_JOB_END_POINT } from '../uttils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../redux/ApplicationSlice';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { Applicants } = useSelector(store => store.Application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_JOB_END_POINT}/${id}/applicant`,
          { withCredentials: true }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, id]);

  return (
    <div className="w-full min-h-screen">
      <NavBar />

      {/* Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Responsive Header */}
        <h1 className="text-xl sm:text-2xl font-bold mb-6">
          Applicants ({Applicants?.Application?.length || 0})
        </h1>

        {/* Table Section */}
        <div className="w-full overflow-x-auto rounded-lg shadow">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
