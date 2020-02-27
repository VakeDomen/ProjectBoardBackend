export class GoogleCredentials {
    id: string;
    email: string;
    tokens: {
        access_token: string,
        refresh_token: string,
        scope: string,
        token_type: string,
        id_token: string,
        expiry_date: string,
    }

    constructor(id: string, email: string, tokens: any) {
        this.id = id;
        this.email = email;
        this.tokens = tokens;
    }
}