import { Request, Response, NextFunction } from 'express';

function cleanObject(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(cleanObject);
  }

  const cleaned: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    // Prohibit keys starting with $ (MongoDB query operators like $where, $gt, $ne)
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }
    cleaned[key] = cleanObject(obj[key]);
  }
  return cleaned;
}

export function sanitizeNoSql(req: Request, res: Response, next: NextFunction): void {
  if (req.body && typeof req.body === 'object') {
    req.body = cleanObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    req.query = cleanObject(req.query);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = cleanObject(req.params);
  }
  next();
}
