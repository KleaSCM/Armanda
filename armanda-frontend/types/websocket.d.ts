declare module 'websocket' {
  export class WebSocket {
      constructor(url: string);

      onmessage: (event: MessageEvent) => void;
      onopen: (event: Event) => void;
      onerror: (event: Event) => void;
      onclose: (event: CloseEvent) => void;

      send(data: string | ArrayBuffer | ArrayBufferView): void;
      close(code?: number, reason?: string): void;
  }

  export interface MessageEvent {
      data: string | ArrayBuffer | ArrayBufferView;
      origin?: string;
      lastEventId?: string;
      source?: Window | null;
      ports?: MessagePort[];
      type: string;
  }

  export interface CloseEvent {
      code: number;
      reason: string;
      wasClean: boolean;
  }

  export interface Event {
      type: string;
  }
}
