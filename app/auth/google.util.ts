import { google } from 'googleapis';
import  {OAuth2Client} from 'google-auth-library';
import { GoogleCredentials } from '../models/google.credentials';

const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: process.env.GOOGLE_REDIRECT_URL,
};

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];

function createConnection(): OAuth2Client {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

function createPeopleConfig(auth: OAuth2Client): any {
    return { 
        resourceName: 'people/me',
        personFields: 'emailAddresses,names',
        auth: auth
    }
}

function getConnectionUrl(auth: OAuth2Client): string {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    }); 
}

function getGooglePlusApi(): any {
    return google.people('v1').people;
}


/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
export function urlGoogle(): string {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
export async function getGoogleAccountFromCode(code): Promise<GoogleCredentials> {
    const auth = createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    auth.setCredentials(tokens);
    const people = getGooglePlusApi();
    const peopleConfig = createPeopleConfig(auth);
    const me = await people.get(peopleConfig);
    const userGoogleId = me.data.resourceName && me.data.resourceName.split("/")[1];
    const userGoogleEmail = me.data.emailAddresses && me.data.emailAddresses.length && me.data.emailAddresses[0].value;
    return new GoogleCredentials(
        userGoogleId,
        userGoogleEmail,
        tokens
    );
}

export async function verifyToken(token: string): Promise<string | null> {
    const clientId = googleConfig.clientId ? googleConfig.clientId  : '';
    const auth = createConnection();
    const ticket = await auth.verifyIdToken({
        idToken: token,
        audience: clientId, 
    });
    const payload = ticket.getPayload();
    const userid = payload? payload['sub'] : null;
    return userid;
}