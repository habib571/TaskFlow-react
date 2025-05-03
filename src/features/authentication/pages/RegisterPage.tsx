import { Container, Row, Col } from 'react-bootstrap';
import RegisterSidebar from '../components/RegisterSidebar';
import RegisterForm from '../components/RegisterForm';
const RegisterPage = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: '900px' }}>
        <Col md={6} className="d-none d-md-block">
          <RegisterSidebar />
        </Col>
        <Col md={6}>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;