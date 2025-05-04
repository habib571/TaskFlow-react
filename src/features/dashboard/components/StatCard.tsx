// components/dashboard/StatCard.tsx
import React from 'react';
import { Card } from 'react-bootstrap';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  count: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, count }) => (
  <Card className="border-0 shadow-sm h-100 stat-card">
    <Card.Body className="d-flex align-items-center">
      <div className="bg-opacity-10 p-3 rounded-3 me-3">{icon}</div>
      <div>
        <h6 className="text-muted mb-1">{label}</h6>
        <h3 className="fw-bold mb-0">{count}</h3>
      </div>
    </Card.Body>
  </Card>
);

export default StatCard;
