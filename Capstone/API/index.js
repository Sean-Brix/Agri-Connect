import express from 'express'

// Route: ('/api')
const router = express.Router();

import auth from '../API/Authentication/auth.js'
router.get('/authentication', auth)

import test from '../API/Testing/testing.js'
router.get('/test', test);

export default router;