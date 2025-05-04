import React from 'react';
import { FolderKanban } from 'lucide-react';

const LoginHero: React.FC = () => (
  <div className="bg-primary text-white p-5 h-100 rounded-start d-flex flex-column justify-content-center align-items-center">
    <div className="text-center mb-5">
      <FolderKanban size={60} />
      <h1 className="mt-3 fw-bold">TaskFlow</h1>
      <p className="lead">Streamline your workflow</p>
    </div>
    <div className="bg-white bg-opacity-10 p-4 rounded-3">
      <h4 className="fw-light">Organize. Collaborate. Deliver.</h4>
      <p>
        TaskFlow helps teams work more efficiently with powerful project management tools.
      </p>
    </div>
  </div>
);

export default LoginHero;
