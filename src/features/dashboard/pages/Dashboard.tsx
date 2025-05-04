import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FolderKanban } from 'lucide-react';
import { useProject } from '../../../contexts/ProjectContext';
import { useAuth } from '../../../contexts/AuthContext';

import StatCard from '../components/StatCard';
import RecentProjects from '../components/RecentProjects';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import QuickActions from '../components/QuickActions'
const Dashboard: React.FC = () => {
  const { projects, tasks, loading } = useProject();
  const { user } = useAuth();

  const myProjects = projects.filter(project =>
    project.members.some(member => member.userId === user?.id)
  );

  const myTasks = tasks.filter(task =>
    task.assignees.includes(user?.id || '')
  );

  const completedTasks = myTasks.filter(task => task.status === 'done');
  const pendingTasks = myTasks.filter(task => task.status !== 'done');

  const upcomingDeadlines = myTasks
    .filter(task => task.dueDate && new Date(task.dueDate) > new Date() && task.status !== 'done')
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  const recentProjects = [...myProjects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const teamMemberCount = Array.from(
    new Set(myProjects.flatMap(p => p.members.map(m => m.userId)))
  ).length;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 fw-bold">Dashboard</h1>
        <Link to="/projects" className="btn btn-primary btn-icon">
          <span>New Project</span>
        </Link>
      </div>

      <Row className="g-4 mb-4">
  <Col md={6} lg={3}>
    <StatCard
      label="My Projects"
      count={myProjects.length}
      icon={<FolderKanban size={24} className="text-primary" />}
    />
  </Col>
  <Col md={6} lg={3}>
    <StatCard
      label="Pending Tasks"
      count={pendingTasks.length}
      icon={<FolderKanban size={24} className="text-warning" />}
    />
  </Col>
  <Col md={6} lg={3}>
    <StatCard
      label="Completed Tasks"
      count={completedTasks.length}
      icon={<FolderKanban size={24} className="text-success" />}
    />
  </Col>
  <Col md={6} lg={3}>
    <StatCard
      label="Team Members"
      count={teamMemberCount}
      icon={<FolderKanban size={24} className="text-info" />}
    />
  </Col>
</Row>


      <Row className="g-4">
        <Col lg={8}>
          <RecentProjects projects ={recentProjects} />
        </Col>
        <Col lg={4}>
        <UpcomingDeadlines deadlines={upcomingDeadlines} projects={projects} />
          <QuickActions />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
