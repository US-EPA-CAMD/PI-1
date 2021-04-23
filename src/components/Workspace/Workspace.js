import { NavDropDownButton, MegaMenu } from "@trussworks/react-uswds";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Workspace.scss";
import { HiDesktopComputer } from "react-icons/hi";
const Workspace = () => {
  const [open, setOpen] = useState(true);
  const subMenu = [
    <Link
      to="./monitoring-plans"
      rel="Monitoring Plans"
      title="Go to the Monitoring Plans page"
    >
      - Monitoring Plans
    </Link>,
    <Link
      to="./qa_certifications"
      rel={"QA & Certifications"}
      title={"Go to the QA & Certifications page"}
    >
      {"- QA & Certifications"}
    </Link>,
    <Link to="./emissions" rel="Emissions" title="Go to the Emissions page">
      - Emissions
    </Link>,
  ];
  const testing = (news) => {
    setOpen(!news);
  };
  const workSpace = (
    <>
      <div className="workspaceMenu">
        <NavDropDownButton
          className="bg-base text-white"
          onToggle={() => {
            testing(open);
          }}
          menuId="MenuDropDown"
          isOpen={open}
          label={<div className="text-underline"> Workspace</div>}
          isCurrent={open}
        />
        <MegaMenu
          key="workspace"
          items={[subMenu]}
          isOpen={open}
          id={"MenuDropDown"}
          className="position-relative top-neg-2"
        />
      </div>
    </>
  );

  return (
    <div className="workspaceDropp">
      <div className="iconLine iconDiv">
        <HiDesktopComputer size={32} style={{ fill: "white" }} />
      </div>
      <div className="workspaceDropDown">{workSpace}</div>
    </div>
  );
};

export default Workspace;
