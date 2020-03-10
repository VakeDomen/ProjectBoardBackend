// import * as url from 'url';
import { login, register } from '../auth/local.util';
// import { urlGoogle, getGoogleAccountFromCode, verifyToken } from '../auth/google.util';
import * as express from 'express';
import { Response } from '../models/response';
import { SuccessResponse } from '../models/success.response';


const router: express.Router = express.Router();


// ------------------------------ local auth --------------------------------

router.post("/auth/local/register", async (req: express.Request, resp: express.Response) => {
    const response: Response = await register(req);
    response.send(resp);
});

router.post("/auth/local/login", async (req: express.Request, resp: express.Response) => {
    const response: Response = await login(req);
    response.send(resp);
});

// TODO: invalidate JWT token
// router.post("/auth/local/logout", varifyTokenMiddleware, (req: express.Request, resp: express.Response) => {
//     const response: Response = logout();
//     response.send(resp);
//     new SuccessResponse(200, 'hey', { vali: req['validToken'], user: req['loggedUser']})
// });

// ----------------------------- google auth --------------------------------

// router.get("/auth/google/url", async (req: express.Request, resp: express.Response) => {
//     const url = urlGoogle();
    
//     request(url, {json: true}, (err, res, body) => {
//         resp.writeHead(200, {
//             'Content-Type': 'text/html'
//         });
//         console.log(body);
//         resp.write(body);
//     });
    
// });

// router.get("/auth/google/auth", async (req: express.Request, resp: express.Response) => {
//     const query = url.parse(req.url,true).query;
//     const data = await getGoogleAccountFromCode(query.code);
//     resp.send(data);
// });

// router.post("/auth/google/verify", async (req: express.Request, resp: express.Response) => {
//     const token = req.body["idToken"]
//     resp.send(await verifyToken(token));
// });



module.exports = router;