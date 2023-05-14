import { Widget } from './widget';

export interface User {
  nickname: string;
  name: string;
  about: string;
  avatar: string;
  totem: string;
  details: string;
  widgets: Widget[];
}
