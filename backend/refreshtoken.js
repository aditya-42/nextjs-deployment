const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

fs.readFile('client_id.json', (err, content) => {
    if (err) return console.error('Error loading client secret file:', err);
    authorize(JSON.parse(content), createEvent);
});

function authorize(credentials, callback) {
    const { client_id, client_secret, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        response_type: 'code', // Add this line
    });
    console.log('Authorize this app by visiting this URL:', authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);

            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function createEvent(auth) {
    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
        summary: 'Interview with HireEase',
        description: 'Interview for the applicant.',
        start: {
            dateTime: '2025-03-15T09:00:00-07:00',
            timeZone: 'America/New_York',
        },
        end: {
            dateTime: '2025-03-15T10:00:00-07:00',
            timeZone: 'America/New_York',
        },
        attendees: [{ email: 'applicant@example.com' }],
        conferenceData: {
            createRequest: { requestId: 'unique-request-id' },
        },
    };

    calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1,
        }, (err, res) => {
            if (err) return console.error('Error creating event:', err);
            console.log('Event created:', res.data.htmlLink);
            console.log('Google Meet link:', res.data.hangoutLink);
        }
    );
}
