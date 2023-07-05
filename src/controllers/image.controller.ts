import { Request, Response } from 'express';

export function showImage(req: Request, res: Response) {
  return res.send('here');
}
export function imageControllerUpload(req: Request, res: Response) {
  const { file } = req;
  console.log(file);
  return res.send('holla');
}
