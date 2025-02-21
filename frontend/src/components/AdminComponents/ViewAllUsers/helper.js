export const columns = [
    { key: "id", label: "ID" , fixed : true },
    { key: "full_name", label: "Name" },
    { key: "mobile_no", label: "Mobile No" },
  { key: "email", label: "Email" },
  { key: "kyc_status", label: "KYC Status" },
];

export const initialFilter = {
  full_name: "",
  mobile_no: "",
  email: "",
  kyc_status: "",
};

export const kycStatusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Under Review", value: "under_review" },
  ];
  