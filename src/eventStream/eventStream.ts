export interface EventStream {
  subscribe(queue: string, func: (payload: any) => void): Promise<void>;
}
