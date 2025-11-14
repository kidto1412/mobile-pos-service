import * as fs from 'fs';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export function saveUploadedFile(
  folderPath: string,
  file: Express.Multer.File,
) {
  if (!file) return null;

  // pastikan folder ada
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // generate nama unik
  const filename = `${uuidv4()}${extname(file.originalname)}`;
  const savePath = `${folderPath}/${filename}`;

  // simpan file dari memoryStorage buffer
  fs.writeFileSync(savePath, file.buffer);

  // return path yang disimpan
  return {
    filename,
    url: `${folderPath.replace('./', '/')}/${filename}`,
  };
}
