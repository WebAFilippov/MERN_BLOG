import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { mkdir, appendFile } from 'fs/promises';
import fse from 'fs-extra';
import { join } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'dd.MM.yyyy\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid().substring(0, 6)}\t${message}\n`;

  try {
    if (!fse.existsSync(join(__dirname, '..', 'logs'))) {
      await mkdir(join(__dirname, '..', 'logs'));
    }

    await appendFile(join(__dirname, '..', 'logs', logName), logItem);
  } catch (err) {
    console.log(err);
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
}

export { logger, logEvents };
