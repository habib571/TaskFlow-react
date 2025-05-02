import { FolderKanban } from 'lucide-react';

const RegisterSidebar = () => {
  return (
    <div className="bg-primary text-white p-5 h-100 rounded-start d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-5">
        <FolderKanban size={60} />
        <h1 className="mt-3 fw-bold">TaskFlow</h1>
        <p className="lead">Streamline your workflow</p>
      </div>
      <div className="bg-white bg-opacity-10 p-4 rounded-3">
        <h4 className="fw-light">Organize. Collaborate. Deliver.</h4>
        <p>Join thousands of teams using TaskFlow to track projects, manage tasks, and meet deadlines.</p>
      </div>
    </div>
  );
};

export default RegisterSidebar;