// User types
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  // Authentication types
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  }
  
  // Project types
  export interface Project {
    id: string;
    name: string;
    description: string;
    createdBy: string;
    createdAt: Date;
    members: ProjectMember[];
  }
  
  export interface ProjectMember {
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
  }
  
  // Task types
  export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignees: string[];
    createdBy: string;
    createdAt: Date;
    dueDate?: Date;
    completedAt?: Date;
  }
  
  // Column types for Kanban view
  export interface Column {
    id: string;
    title: string;
    taskIds: string[];
  }
  
  // Calendar event types
  export interface CalendarEvent {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    createdBy: string;
    attendees: string[];
    isVideoCall?: boolean;
    meetingLink?: string;
  }
  
  // Video Call types
  export interface PeerConnection {
    peerId: string;
    stream: MediaStream;
  }
  
  export interface VideoCallState {
    localStream: MediaStream | null;
    remoteStreams: Map<string, MediaStream>;
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
  }
  
  // Notification types
  export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: Date;
    link?: string;
  }