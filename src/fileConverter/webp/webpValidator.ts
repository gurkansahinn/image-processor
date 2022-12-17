export function webpBufferValidator(content: Buffer): boolean {
  return content.slice(0, 4).toString() === 'RIFF';
}
