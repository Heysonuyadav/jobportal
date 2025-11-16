import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/");
    } else {
      setChecking(false);
    }
  }, [user, navigate]);

  
  if (checking) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Checking access...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
