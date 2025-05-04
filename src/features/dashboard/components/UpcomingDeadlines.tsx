import { Card } from 'react-bootstrap';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { Project, Task } from '../../../types';

type UpcomingDeadlinesProps = {
    deadlines: Task[];
    projects: Project[];
  };
  
const UpcomingDeadlines = ({deadlines , projects } : UpcomingDeadlinesProps) => {
  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">Upcoming Deadlines</h5>
          <Link to="/projects" className="btn btn-sm btn-outline-primary">View All</Link>
        </div>

        {deadlines.length === 0 ? (
          <div className="text-center py-4">
            <Calendar size={40} className="text-muted mb-2" />
            <p className="text-muted mb-0">No upcoming deadlines</p>
          </div>
        ) : (
          <div>
            {deadlines.map(task => {
              const project = projects.find(p => p.id === task.projectId);
              const dueDate = task.dueDate ? new Date(task.dueDate) : null;

              return (
                <div key={task.id} className="p-3 border rounded mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1 fw-semibold">{task.title}</h6>
                      <span className="badge bg-primary mb-2">{project?.name}</span>
                      {dueDate && (
                        <div className="small text-danger">Due: {dueDate.toLocaleDateString()}</div>
                      )}
                    </div>
                    <span className={`badge ${
                      task.status === 'todo' ? 'bg-secondary' :
                      task.status === 'in-progress' ? 'bg-warning' :
                      task.status === 'review' ? 'bg-info' : 'bg-success'
                    }`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default UpcomingDeadlines;
