import React from "react";
import Footer from "../Footer/Footer";
import WideHeader from "../WideHeader/WideHeader";
import "./Layout.scss";
import LeftNavigation from "../LeftNavigation/LeftNavigation";

const Layout = (props) => {
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child)
  );
  return (
    <div className="react-transition fade-in">
      <div className="topHeader">
        <WideHeader />
      </div>
      <div className="grid-row">
        <div className="grid-col-2">
          <LeftNavigation />
        </div>
        <div className="grid-col minh-tablet-lg margin-x-2">
          {childrenWithProps}
        </div>
      </div>
      <div className="bottomFooter">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;