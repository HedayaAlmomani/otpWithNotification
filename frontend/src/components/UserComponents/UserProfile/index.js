import React, { useState, useEffect } from "react";
import "./style.scss";
import SimpleLabelValue from "../../../CoreComponent/SimpleLabelValue";
import { useAuth } from "../../../common/authContext";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    kyc_document_type: "",
    kyc_document_front: null,
    kyc_document_back: null,
    kyc_selfie_image: null,
    referral_code: "",
    referred_by: "",
  });
  const { userData } = useAuth();

  const fetchUserData = async () => {
    setFormData({
      email: userData?.email || "",
      full_name: userData?.full_name || "",
      kyc_document_type: userData?.kyc_document_type || "",
      kyc_document_front: userData?.kyc_document_front || null,
      kyc_document_back: userData?.kyc_document_back || null,
      kyc_selfie_image: userData?.kyc_selfie_image || null,
      referral_code: userData?.referral_code || "",
      referred_by: userData?.referred_by || "",
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <img src={formData.kyc_selfie_image} alt="Profile Selfie" />
        <h4>{formData.full_name}</h4>
      </div>

      <h3>User Profile</h3>
      <div className="user-profile">
        <SimpleLabelValue label="Email" value={formData.email} />
        <SimpleLabelValue label="Full Name" value={formData.full_name} />
        <SimpleLabelValue
          label="KYC Document Type"
          value={formData.kyc_document_type}
        />
        <SimpleLabelValue
          label="KYC Document Front"
          value={<img src={formData.kyc_document_front} alt="Document Front" />}
        />
        <SimpleLabelValue
          label="KYC Document Back"
          value={<img src={formData.kyc_document_back} alt="Document Back" />}
        />
        <SimpleLabelValue
          label="Referral Code"
          value={formData.referral_code}
        />
        <SimpleLabelValue label="Referred By" value={formData.referred_by} />
      </div>
    </div>
  );
};

export default UserProfile;
