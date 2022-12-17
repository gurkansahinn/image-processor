export interface Storage {
  getWithPath(path: string): Promise<Buffer>;
  upload(path: string, content: Buffer): Promise<void>;
  delete(path: string): Promise<void>;
}
