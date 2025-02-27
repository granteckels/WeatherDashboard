import { Router } from 'express';
const router = Router();

import weatherRoutes from './weatherRoutes.js';

router.use('/weather', weatherRoutes);
router.use('/', (req, res) => {
    res.status(404).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET ${req.originalUrl}</pre>
</body>
</html>
    `)
});

export default router;
