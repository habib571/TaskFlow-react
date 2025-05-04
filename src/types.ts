export interface User {
    id: string;
    fullName: string;
    email: string;
    imageUrl?: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  }
  
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
  
  export interface Column {
    id: string;
    title: string;
    taskIds: string[];
  }
  
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