import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm(); // Use IncomingForm directly

    const uploadDir = path.join(process.cwd(), '/public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ error: 'Form parse error', details: err.message });
      }

      console.log('Fields:', fields);
      console.log('Files:', files);

      if (!files || !files.image) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const file = files.image[0];
      console.log('Uploaded file:', file);

      res.status(200).json({ message: 'File uploaded successfully', file: file.filepath });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
