import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';
import { Project, ProjectMember, Task, Column, CalendarEvent } from '../types';

interface ProjectContextType {
  projects: Project[];
  tasks: Task[];
  columns: Record<string, Column>;
  events: CalendarEvent[];
  loading: boolean;
  createProject: (name: string, description: string) => string;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  getProject: (projectId: string) => Project | undefined;
  inviteMember: (projectId: string, userId: string, role: ProjectMember['role']) => void;
  removeMember: (projectId: string, userId: string) => void;
  createTask: (projectId: string, title: string, description: string, assignees: string[], dueDate?: Date) => string;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  getProjectTasks: (projectId: string) => Task[];
  updateColumnOrder: (columnId: string, taskIds: string[]) => void;
  createEvent: (projectId: string, title: string, start: Date, end: Date, attendees: string[], description?: string) => string;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (eventId: string) => void;
  getProjectEvents: (projectId: string) => CalendarEvent[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Record<string, Column>>({
    'todo': { id: 'todo', title: 'To Do', taskIds: [] },
    'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
    'review': { id: 'review', title: 'Review', taskIds: [] },
    'done': { id: 'done', title: 'Done', taskIds: [] },
  });
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    const storedTasks = localStorage.getItem('tasks');
    const storedColumns = localStorage.getItem('columns');
    const storedEvents = localStorage.getItem('events');
    
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedColumns) setColumns(JSON.parse(storedColumns));
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('projects', JSON.stringify(projects));
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('columns', JSON.stringify(columns));
      localStorage.setItem('events', JSON.stringify(events));
    }
  }, [projects, tasks, columns, events, loading]);

  const createProject = (name: string, description: string): string => {
    if (!user) throw new Error('User must be authenticated to create a project');
    
    const newProject: Project = {
      id: uuidv4(),
      name,
      description,
      createdBy: user.id,
      createdAt: new Date(),
      members: [
        {
          userId: user.id,
          role: 'owner',
          joinedAt: new Date()
        }
      ]
    };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    return newProject.id;
  };

  const updateProject = (project: Project) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === project.id ? project : p)
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
    setTasks(prevTasks => prevTasks.filter(t => t.projectId !== projectId));
    setEvents(prevEvents => prevEvents.filter(e => e.projectId !== projectId));
    
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach(columnId => {
      const column = updatedColumns[columnId];
      const remainingTaskIds = column.taskIds.filter(
        taskId => tasks.find(t => t.id === taskId)?.projectId !== projectId
      );
      updatedColumns[columnId] = { ...column, taskIds: remainingTaskIds };
    });
    setColumns(updatedColumns);
  };

  const getProject = (projectId: string): Project | undefined => {
    return projects.find(p => p.id === projectId);
  };

  const inviteMember = (projectId: string, userId: string, role: ProjectMember['role']) => {
    setProjects(prevProjects => 
      prevProjects.map(project => {
        if (project.id === projectId) {
          // Check if user is already a member
          const existingMemberIndex = project.members.findIndex(m => m.userId === userId);
          
          if (existingMemberIndex >= 0) {
            const updatedMembers = [...project.members];
            updatedMembers[existingMemberIndex] = {
              ...updatedMembers[existingMemberIndex],
              role
            };
            return { ...project, members: updatedMembers };
          } else {
            return {
              ...project,
              members: [
                ...project.members,
                {
                  userId,
                  role,
                  joinedAt: new Date()
                }
              ]
            };
          }
        }
        return project;
      })
    );
  };

  const removeMember = (projectId: string, userId: string) => {
    setProjects(prevProjects => 
      prevProjects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            members: project.members.filter(m => m.userId !== userId)
          };
        }
        return project;
      })
    );
  };

  const createTask = (
    projectId: string, 
    title: string, 
    description: string, 
    assignees: string[], 
    dueDate?: Date
  ): string => {
    if (!user) throw new Error('User must be authenticated to create a task');
    
    const newTask: Task = {
      id: uuidv4(),
      projectId,
      title,
      description,
      status: 'todo',
      priority: 'medium',
      assignees,
      createdBy: user.id,
      createdAt: new Date(),
      dueDate,
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    // Add task to the todo column
    setColumns(prevColumns => ({
      ...prevColumns,
      todo: {
        ...prevColumns.todo,
        taskIds: [...prevColumns.todo.taskIds, newTask.id]
      }
    }));
    
    return newTask.id;
  };

  const updateTask = (task: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === task.id ? task : t)
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    
    // Remove task from columns
    setColumns(prevColumns => {
      const updatedColumns: Record<string, Column> = {};
      
      Object.keys(prevColumns).forEach(columnId => {
        updatedColumns[columnId] = {
          ...prevColumns[columnId],
          taskIds: prevColumns[columnId].taskIds.filter(id => id !== taskId)
        };
      });
      
      return updatedColumns;
    });
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    // Get the current task
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Update the task status
    const updatedTask = { ...task, status };
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === taskId ? updatedTask : t)
    );
    
    let sourceColumnId: string | null = null;
    
    Object.keys(columns).forEach(columnId => {
      if (columns[columnId].taskIds.includes(taskId)) {
        sourceColumnId = columnId;
      }
    });
    
    if (sourceColumnId === status) return; 
    
    setColumns(prevColumns => {
      const updatedColumns = { ...prevColumns };
      
      if (sourceColumnId) {
        updatedColumns[sourceColumnId] = {
          ...updatedColumns[sourceColumnId],
          taskIds: updatedColumns[sourceColumnId].taskIds.filter(id => id !== taskId)
        };
      }
      
      updatedColumns[status] = {
        ...updatedColumns[status],
        taskIds: [...updatedColumns[status].taskIds, taskId]
      };
      
      return updatedColumns;
    });
  };

  const getProjectTasks = (projectId: string): Task[] => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const updateColumnOrder = (columnId: string, taskIds: string[]) => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        taskIds
      }
    }));
  };

  const createEvent = (
    projectId: string, 
    title: string, 
    start: Date, 
    end: Date, 
    attendees: string[],
    description?: string
  ): string => {
    if (!user) throw new Error('User must be authenticated to create an event');
    
    const newEvent: CalendarEvent = {
      id: uuidv4(),
      projectId,
      title,
      description,
      start,
      end,
      createdBy: user.id,
      attendees
    };
    
    setEvents(prevEvents => [...prevEvents, newEvent]);
    return newEvent.id;
  };

  const updateEvent = (event: CalendarEvent) => {
    setEvents(prevEvents => 
      prevEvents.map(e => e.id === event.id ? event : e)
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
  };

  const getProjectEvents = (projectId: string): CalendarEvent[] => {
    return events.filter(event => event.projectId === projectId);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      tasks,
      columns,
      events,
      loading,
      createProject,
      updateProject,
      deleteProject,
      getProject,
      inviteMember,
      removeMember,
      createTask,
      updateTask,
      deleteTask,
      updateTaskStatus,
      getProjectTasks,
      updateColumnOrder,
      createEvent,
      updateEvent,
      deleteEvent,
      getProjectEvents
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};