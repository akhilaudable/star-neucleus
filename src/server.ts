import express, { Request, Response, NextFunction } from 'express';
import router from './routes';
import connectDB from './config/db';
interface HttpError extends Error {
    status?: Number;
    details?: any;
}

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().catch(err => console.error('Connection error:', err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method; // HTTP method (GET, POST, etc.)
    const url = req.originalUrl; // Requested URL
    const ip = req.ip; // Client IP address

    // Log the request details to the console
    console.log(`[${timestamp}] ${method} ${url} from ${ip}`);
    next(); // Pass control to the next middleware/route handler
});

app.use('/api', router);

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });
}

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error('[ERROR]', new Date().toISOString(), err.stack);
  
  // 3. Handle different error types
  const status = Number(err.status ?? 500);
  const message = status >= 500 ? 'Something went wrong!' : err.message;
  // 4. Send error response
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err.details
    })
  });
});

