import { Portal } from './portal';

export interface List {
    id: string;
    name: string;
    content: string;
    portals: Portal[];
  }