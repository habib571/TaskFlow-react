import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import LoginHero from '../components/LoginHero';

const Login: React.FC = () => (
  <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
    <Row className="w-100" style={{ maxWidth: '900px' }}>
      <Col md={6} className="d-none d-md-block">
        <LoginHero />
      </Col>
      <Col md={6}>
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default Login;