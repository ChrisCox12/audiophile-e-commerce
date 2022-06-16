import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


export async function loginAdmin(req, res) {
    const { username, password } = req.body;

    try {
        if(username === 'admin' && password === 'admin') {
            const token = jwt.sign({ username: username }, JWT_SECRET_KEY);

            res.json({ success: true, adminToken: token });
        }
        else {
            res.json({ success: false, msg: 'Failed to validate credentials' });
        }
    } 
    catch(error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to log you in' });
    }
}