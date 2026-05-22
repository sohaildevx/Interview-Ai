import multer from 'multer';


export const upload = multer({
    storage: multer.memoryStorage(),
    Limits:{
        fileSize: 3 * 1024 * 1024,
    }
})
