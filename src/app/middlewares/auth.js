import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

//import { next } from "sucrase/dist/parser/tokenizer";

export default async (req, res, next) => {
     const authHeaders = req.headers.authorization;

     if(!authHeaders){
        return res.status(401).json({error: "Token not provide"});
     }

     const [, token] = authHeaders.split(' ');

     try{
         const decoded = await promisify(jwt.verify)(token, authConfig.secret);
         req.userId = decoded.id;
         return next();
     }catch(err){
        return res.status(401).json({error: "Token invalid"});
     }

}
