// components/dashboard/QuickActions.tsx
import { Card, Button } from 'react-bootstrap';
import { FolderKanban, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => (
  <Card className="border-0 shadow-sm">
    <Card.Body>
      <h5 className="card-title fw-bold mb-3">Quick Actions</h5>
      <div className="d-grid gap-2">
        <Link to="/projects" className="btn btn-outline-primary btn-icon">
          <FolderKanban size={16} />
          <span>Create New Project</span>
        </Link>
        <Button variant="outline-secondary" className="btn-icon">
          <Calendar size={16} />
          <span>View Calendar</span>
        </Button>
        <Link to="/profile" className="btn btn-outline-secondary btn-icon">
          <Users size={16} />
          <span>My Profile</span>
        </Link>
      </div>
    </Card.Body>
  </Card>
);

export default QuickActions;
