import { access, readFile, writeFile } from 'node:fs/promises'

export async function readJson<T> (file: string): Promise<T>  {
  const jsonText = await readFile(file, {encoding: 'utf-8'})
  return JSON.parse(jsonText)
}

export function writeJson (file: string, content: any): Promise<void> {
  return writeFile(file, JSON.stringify(content, undefined, 2))
}

export function checkFileExists(file: string): Promise<boolean> {
  return access(file)
    .then(() => true)
    .catch(() => false)
}
