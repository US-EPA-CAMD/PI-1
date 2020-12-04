import React from "react";
import UswdsTable from "../../Common/Table/UswdsTable";
import "./DataTableRender.css";

const DataTableRender = ({
  columns,
  data,
  selectedRowHandler,
  dataSelector,
}) => {
  return (
    <div className="tableContainerWS">
      <UswdsTable
        columns={columns}
        data={data}
        bordered={false}
        //paginate
        //showEntries={[100, 250, 500]}
        search
        //disabledColumnFilters={[0]}
        selectedRowHandler={selectedRowHandler}
        dataSelector={dataSelector}
        //editable
        viewDataColumn
        title="Facilities"
      />
    </div>
  );
};

export default DataTableRender;
