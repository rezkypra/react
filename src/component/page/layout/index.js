import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Container from 'react-bootstrap/Container';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from 'cdbreact';

import { Link, Outlet } from 'react-router-dom';

let Layout = () => {
  return (
    <>
      <Container className="d-flex">
        <CDBSidebar textColor="white" backgroundColor="#5a8dc7" fontWeight="bold">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Travel Request
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <CDBSidebarMenuItem icon="th-large" style={{ height: '20px' }}>
                <Link to="/">Home</Link>
              </CDBSidebarMenuItem>
              <CDBSidebarMenu>
                <CDBSidebarMenuItem icon="credit-card" iconType="solid">
                  <Link to="travelEmployee">Travel Employee</Link>
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem icon="credit-card" iconType="solid">
                  <Link to="posttravel">Change Travel</Link>
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem title="Travel" icon="table">
                  <Link to="travelManager">Travel Manager</Link>
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem title="Change Update Travel" icon="table">
                  <Link to="posttravelManager">Post-Travel Manager</Link>
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem title="Travel HR" icon="table">
                  <Link to="travelHR">Travel HR</Link>
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem title="Approval HR" icon="table">
                  <Link to="posttravelHR">Post-Travel HR</Link>
                </CDBSidebarMenuItem>
              </CDBSidebarMenu>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }, { height: '350px' }}>
              {/* Your footer content */}
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
