import React from "react";

import UswdsTable from "../../UswdsTable/UswdsTable";
import "../DataTableSystemsComponents/DataTableSystemsComponentsRender.scss";

const DataTableSystemsComponentsRender = ({
  openModal,
  columns,
  data,
  selectedRowHandler,
}) => {
  return (
    <div className="systemsCompTable">
      <UswdsTable
        title="System Components"
        columns={columns}
        data={data}
        bordered={false}
        header={true}
        // /paginate
        // showEntries={[10, 250, 500]}
        // search
        // viewDataColumn
        viewDataColumn
        // openTabColumn={[]}
        selectedRowHandler={selectedRowHandler}
        // openModal={openModal}
        addBTN={true}
      />

    </div>
  );
};

export default DataTableSystemsComponentsRender;
