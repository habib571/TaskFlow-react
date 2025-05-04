// components/dashboard/RecentProjects.tsx
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FolderKanban, Users } from 'lucide-react'; 
import { Project } from '../../../types';
  
  type RecentProjectsProps = {
    projects: Project[];
  };
const RecentProjects = ({ projects }: RecentProjectsProps) => {
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">Recent Projects</h5>
          <Link to="/projects" className="btn btn-sm btn-outline-primary">View All</Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-5">
            <FolderKanban size={48} className="text-muted mb-3" />
            <h6 className="fw-normal">No projects yet</h6>
            <p className="text-muted">Create your first project to get started</p>
            <Link to="/projects" className="btn btn-primary">Create Project</Link>
          </div>
        ) : (
          <div className="project-list">
            {projects.map(project => (
              <Card key={project.id} className="mb-3 project-card border">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-semibold">{project.name}</h5>
                      <p className="text-muted mb-0 small">
                        {project.description.length > 100
                          ? project.description.substring(0, 100) + '...'
                          : project.description}
                      </p>
                    </div>
                    <div className="text-end">
                      <div className="d-flex align-items-center mb-2">
                        <Users size={16} className="text-muted me-1" />
                        <span className="small text-muted">{project.members.length} members</span>
                      </div>
                      <div className="d-flex mt-2">
                        <Link to={`/projects/${project.id}/board`} className="btn btn-sm btn-outline-primary me-2">View Board</Link>
                        <Link to={`/projects/${project.id}`} className="btn btn-sm btn-primary">Details</Link>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default RecentProjects;
