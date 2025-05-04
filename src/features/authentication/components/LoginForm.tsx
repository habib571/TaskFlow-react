import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { FolderKanban } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Spinner } from 'react-bootstrap';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const success = await login(email, password);
        setLoading(false);
        if (success) {
            navigate('/');
        } else {
            setError('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-center p-4 p-md-5">
                <div className="text-center d-md-none mb-4">
                    <FolderKanban size={40} className="text-primary" />
                    <h1 className="h3 mt-2 fw-bold text-primary">TaskFlow</h1>
                </div>

                <h2 className="mb-4 fw-bold">Welcome back</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 py-2 d-flex justify-content-center align-items-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>

                    <div className="text-center mt-4">
                        <p className="mb-0">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-decoration-none">Sign up</Link>
                        </p>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default LoginForm;
