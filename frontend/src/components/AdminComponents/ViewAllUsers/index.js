import React, { useState, useEffect } from "react";
import Table from "../../../CoreComponent/TableComponent";
import httpServices from "../../../common/httpServices";
import { columns, initialFilter, kycStatusOptions } from "./helper";
import Input from "../../../CoreComponent/Input";
import Select from "../../../CoreComponent/Select";
import "./style.scss";

const ViewAllUsers = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 9,
    total: 0,
  });

  const [filters, setFilters] = useState(initialFilter);

  const sendUserData = async () => {
    const params = {
      page: pagination.currentPage,
      perPage: pagination.perPage,
      ...filters,
    };

    try {
      const response = await httpServices.get(
        "http://localhost:8000/api/user",
        params,
        true
      );
      const users = response.data?.users || [];
      const paginationData = response.data?.pagination || {};

      const formattedData = users.map((user) => ({
        id: user.id,
        full_name: user.full_name || "N/A",
        mobile_no: user.mobile_no || "N/A",
        email: user.email || "N/A",
        kyc_status: user.kyc_status || "N/A",
      }));

      setData(formattedData);
      setPagination(paginationData);
    } catch (error) {
      console.error("Error in sending data:", error);
    }
  };

  useEffect(() => {
    sendUserData();
  }, [pagination.currentPage, pagination.perPage, filters]);

  const handleSort = (key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      if (direction === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setData(sortedData);
  };

  return (
    <div className="view-all-users-container">
      <div className="users-header">All Users</div>
      <div className="view-all-users">
        <div className="main-content">
          <Table
            data={data}
            columns={columns}
            onSort={handleSort}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
        <div className="filters-container">
          <Input
            label="Full Name"
            placeholder="Search by Full Name"
            inputValue={filters.full_name}
            setInputValue={(value) =>
              setFilters({ ...filters, full_name: value })
            }
          />
          <Input
            label="Mobile Number"
            placeholder="Search by Mobile Number"
            inputValue={filters.mobile_no}
            setInputValue={(value) =>
              setFilters({ ...filters, mobile_no: value })
            }
          />
          <Input
            label="Email"
            placeholder="Search by Email"
            inputValue={filters.email}
            setInputValue={(value) => setFilters({ ...filters, email: value })}
          />
          <Select
            label="KYC Status"
            options={kycStatusOptions}
            value={filters.kyc_status}
            setValue={(value) => setFilters({ ...filters, kyc_status: value })}
            placeholder="Select KYC status"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAllUsers;
