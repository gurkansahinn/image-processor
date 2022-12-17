export interface FileConverter {
  convert(path: string): Promise<string>;
}
