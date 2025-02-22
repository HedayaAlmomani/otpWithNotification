import React, { useState, useEffect } from "react";
import useLanguage from "../../../localization/index";
import Table from "../../../CoreComponent/TableComponent";
import httpServices from "../../../common/httpServices";
import { initialFilter, kycStatusOptions } from "./helper";
import Input from "../../../CoreComponent/Input";
import Select from "../../../CoreComponent/Select";
import "./style.scss";

const ViewAllUsers = () => {
  const { t } = useLanguage();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 8,
    total: 0,
  });
  const columns = [
    { key: "id", label: t("ID"), fixed: true },
    { key: "full_name", label: t("name") },
    { key: "mobile_no", label: t("mobile_number") },
    { key: "email", label: t("email") },
    { key: "kyc_status", label: t("kyc_status") },
  ];
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
        full_name: user.full_name || "-",
        mobile_no: user.mobile_no || "-",
        email: user.email || "-",
        kyc_status: user.kyc_status || "-",
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
      <div className="users-header">{t("all_users")}</div>
      <div className="view-all-users">
        <div className="filters-container sticky-top">
          <Input
            label={t("full_name")}
            placeholder={t("search_by_full_name")}
            inputValue={filters.full_name}
            setInputValue={(value) =>
              setFilters({ ...filters, full_name: value })
            }
            required={false}
          />
          <Select
            label={t("kyc_status")}
            options={kycStatusOptions}
            value={filters.kyc_status}
            setValue={(value) => setFilters({ ...filters, kyc_status: value })}
            placeholder={t("select_kyc_status")}
            required={false}
          />
          <Input
            label={t("mobile_number")}
            placeholder={t("search_by_mobile_number")}
            inputValue={filters.mobile_no}
            setInputValue={(value) =>
              setFilters({ ...filters, mobile_no: value })
            }
            required={false}
          />
          <Input
            label={t("email")}
            placeholder={t("search_by_email")}
            inputValue={filters.email}
            setInputValue={(value) => setFilters({ ...filters, email: value })}
            required={false}
          />
        </div>
        <div className="main-content">
          <Table
            data={data}
            columns={columns}
            onSort={handleSort}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAllUsers;
