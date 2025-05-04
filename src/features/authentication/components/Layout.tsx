import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav, Badge } from 'react-bootstrap';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Bell,
  Calendar,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeMobileSidebar = () => {
    setShowMobileSidebar(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <Navbar bg="white" className="shadow-sm py-2 px-3 d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <button
            className="btn d-lg-none me-2"
            onClick={toggleMobileSidebar}
          >
            {showMobileSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Navbar.Brand className="d-flex align-items-center fw-bold text-primary" as={Link} to="/">
            <FolderKanban size={24} className="me-2" />
            <span>TaskFlow</span>
          </Navbar.Brand>
        </div>

        <div className="d-flex align-items-center">
          <div className="position-relative me-3">
            <button
              className="btn"
              onClick={toggleNotifications}
            >
              <Bell size={20} />

            </button>


          </div>

          <div className="d-flex align-items-center">
            <div
              className="avatar bg-primary me-2 d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: '#6EA8FE',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {user?.fullName?.substring(0, 1).toUpperCase()}
            </div>
            <span className="d-none d-md-inline">{user?.fullName}</span>
          </div>
        </div>
      </Navbar>

      <Container fluid className="flex-grow-1 p-0">
        <Row className="g-0 h-100">
          {/* Sidebar for desktop */}
          <Col lg={2} className="d-none d-lg-block sidebar py-4">
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/"
                className={`d-flex align-items-center mb-2 px-3 py-2 ${location.pathname === '/' ? 'bg-light fw-semibold' : ''}`}
              >
                <LayoutDashboard size={18} className="me-2" />
                <span>Dashboard</span>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/projects"
                className={`d-flex align-items-center mb-2 px-3 py-2 ${location.pathname.includes('/projects') && !location.pathname.includes('/board') && !location.pathname.includes('/calendar') ? 'bg-light fw-semibold' : ''}`}
              >
                <FolderKanban size={18} className="me-2" />
                <span>Projects</span>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/profile"
                className={`d-flex align-items-center mb-2 px-3 py-2 ${location.pathname === '/profile' ? 'bg-light fw-semibold' : ''}`}
              >
                <User size={18} className="me-2" />
                <span>Profile</span>
              </Nav.Link>

              <hr />

              <button
                onClick={handleLogout}
                className="btn btn-link text-decoration-none text-dark d-flex align-items-center px-3 py-2"
              >
                <LogOut size={18} className="me-2" />
                <span>Logout</span>
              </button>
            </Nav>
          </Col>

          {/* Mobile sidebar overlay */}
          {showMobileSidebar && (
            <div
              className="position-fixed top-0 start-0 h-100 w-100 bg-dark bg-opacity-50"
              style={{ zIndex: 1040 }}
              onClick={closeMobileSidebar}
            />
          )}

          {/* Mobile sidebar */}
          <div
            className={`position-fixed top-0 start-0 h-100 bg-white d-lg-none ${showMobileSidebar ? 'show' : 'hide'
              }`}
            style={{
              width: '250px',
              zIndex: 1050,
              transform: showMobileSidebar ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s ease-in-out',
              paddingTop: '60px'
            }}
          >
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/"
                className={`d-flex align-items-center mb-2 px-3 py-2 ${location.pathname === '/' ? 'bg-light fw-semibold' : ''}`}
                onClick={closeMobileSidebar}
              >
                <LayoutDashboard size={18} className="me-2" />
                <span>Dashboard</span>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/projects"
                className={`d-flex align-items-center mb-2 px-3 py-2 ${location.pathname.includes('/projects') && !location.pathname.includes('/board') && !location.pathname.includes('/calendar') ? 'bg-light fw-semibold' : ''}`}
                onClick={closeMobileSidebar}
              >
                <FolderKanban size={18} className="me-2" />
                <span>Projects</span>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/profile"
                className={`d-flex align-items-center mb-2 px-3 py-2 ${location.pathname === '/profile' ? 'bg-light fw-semibold' : ''}`}
                onClick={closeMobileSidebar}
              >
                <User size={18} className="me-2" />
                <span>Profile</span>
              </Nav.Link>

              <hr />

              <button
                onClick={() => {
                  handleLogout();
                  closeMobileSidebar();
                }}
                className="btn btn-link text-decoration-none text-dark d-flex align-items-center px-3 py-2"
              >
                <LogOut size={18} className="me-2" />
                <span>Logout</span>
              </button>
            </Nav>
          </div>

          {/* Main content */}
          <Col lg={10} className="px-3 py-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;