import React, { useState } from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import { arrowBottom, arrowUp } from "../../icons";
import Pagination from "../Pagination"; 

import "./style.scss";

const Table = ({ data, columns, onSort, pagination, setPagination }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }

    if (sortConfig.key !== key) {
      direction = "asc";
    }

    setSortConfig({ key, direction });
    onSort(key, direction);
  };

  const getSortArrow = (field) => {
    if (sortConfig.key !== field) return "";
    return sortConfig.direction === "asc" ? (
      <SVG fill="#fff" className="arrow-icon" src={arrowUp}></SVG>
    ) : (
      <SVG fill="#fff" className="arrow-icon" src={arrowBottom}></SVG>
    );
  };

  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };


  return (
    <div className="table-component-container container">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  style={{
                    cursor: "pointer",
                    position: column.fixed ? "sticky" : "static",
                    left: column.fixed ? 0 : "auto",
                    backgroundColor: column.fixed ? "#F87C47" : "#F87C47",
                    zIndex: column.fixed ? 1 : "auto",
                  }}
                >
                  <div className="column-label-container">
                    <div className="label">{column.label}</div>
                    <div>{getSortArrow(column.key)}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                className={selectedRow === index ? "selected-row" : ""}
                style={{ cursor: "pointer" }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      position: column.fixed ? "sticky" : "static",
                      left: column.fixed ? 0 : "auto",
                      zIndex: column.fixed ? 1 : "auto",
                    }}
                  >
                    {item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  setPagination: PropTypes.func.isRequired,
};

export default Table;
