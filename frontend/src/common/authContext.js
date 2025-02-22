import React, { createContext, useState, useContext, useEffect } from "react";
import httpServices from "./httpServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await httpServices.get(`http://localhost:8000/api/user-data` , {} , false);
      if (response.data.success) {
        const user = response.data.user;
        setUserData({
          email: user.email || "",
          full_name: user.full_name || "",
          kyc_document_type: user.kyc_document_type || "",
          kyc_document_front: user.kyc_document_front || null,
          kyc_document_back: user.kyc_document_back || null,
          kyc_selfie_image: user.kyc_selfie_image || null,
          referral_code: user.referral_code || "",
          referred_by: user.referred_by || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); 
  }, []);

  return (
    <AuthContext.Provider value={{ userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
