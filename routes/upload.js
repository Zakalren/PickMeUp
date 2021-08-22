import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import User from '../models/users'

const router = express.Router();
const upload = multer({
    dest: 'public/images/avatar/temp'
});

router.post('/avatar', upload.single('avatarFile'), (req, res) => {
    if (!req.user)
        return res.status(500).send('login first');

    const tempPath = req.file.path;
    const targetPath = path.join(path.resolve(), 'public/images/avatar/'
        + req.user.service_number + '.jpeg');

    fs.rename(tempPath, targetPath, err => {
        if (err)
            return res.status(500).send(err);

        return res.send('file uploaded');
    });
});

export default router;