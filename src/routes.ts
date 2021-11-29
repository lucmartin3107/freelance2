import {Express, Request, Response} from 'express';
export default function(app: Express){

    app.get('/healthcheck', (req:Request, res:Response) => res.sendStatus(200));

    //register user
    // POST api/User



    //login
    // POST /api/session

    // Get the user's sessions
    // GET /api/sessions




    // logout
    // DELETE /api/sessions


    // GET /api/posts /api/posts/postId
}