import * as fs from 'fs';

export class FileUtils {
  static ensureFileExists(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
  }
}
