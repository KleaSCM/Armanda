declare module 'ws' {
  import { EventEmitter } from 'events';

  export class WebSocket extends EventEmitter {
    constructor(address: string);
    on(event: 'message', listener: (message: MessageEvent) => void): this;
    close(): void;
  }

  export interface MessageEvent {
    data: unknown; 
  }
}
