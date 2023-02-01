import { writeFileSync } from 'fs';

export function writeCSVFile(items: any[], header: string, filename: string) {
  const buffer = convertToCSV(items, header);

  writeFileSync(`./${filename}`, buffer);
}

export function convertToCSV(items: any[], header: string) {
  let buffer = `${header}\n`;
  items.forEach((item) => { buffer += `${item}\n`; });
  return buffer;
}
