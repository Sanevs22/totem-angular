import { Widget } from './widget';

export interface User {
  name: string;
  about: string;
  avatar: string;
  totem: string;
  details: string;
  widgets: Widget[];
}
