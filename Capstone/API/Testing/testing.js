import express from 'express'

// Router: ('/api/test')
const router = express.Router();

// TESTING
router.post('/api_response', (req, res)=>{
    const data_1 = req.body.data1;
    const data_2 = req.body.data2;

    res.status(200).json({
        message: "Fetch Request Sucessful",
        payload: [data_1, data_2],
        status: 200
    })
});


export default router;