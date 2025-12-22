
export enum Role {
  USER = 'user',
  MODEL = 'model',
  PEOPLE = 'people'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
  senderName?: string;
  avatar?: string;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  error: string | null;
}

export type ViewState = 'AI' | 'PEOPLE_LIST' | 'DIRECT_CHAT' | 'WORKFLOW_FLOW';

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount?: number;
  type: 'department' | 'person';
  department?: string;
}

export type WorkflowStep = 'PERMISSION' | 'START' | 'RECORDING' | 'CREATE_MODAL';
