const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

//calculates the "to" date 
const calculateTimeMax = (eventDate) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let splitDate = eventDate.split("-");
  let maxDay;
  let maxMonth;
  let maxYear = eventDate.split("-")[2];
  console.log("splitDate first", splitDate);
  if (Number(eventDate.split("-")[0]) === 31 && eventDate.split("-")[1] === "December"){
    maxDay = 1;
    maxMonth = "January";
    maxYear = Number(eventDate.split("-")[2]) + 1;
  } else if (Number(eventDate.split("-")[0]) === 31 && (eventDate.split("-")[1] === "January" || eventDate.split("-")[1] === "March" || eventDate.split("-")[1] === "May" || eventDate.split("-")[1] === "July" || eventDate.split("-")[1] === "August" || eventDate.split("-")[1] === "October" || eventDate.split("-")[1] === "December")) {
    maxDay = 1;
    maxMonth = months[months.indexOf(eventDate.split("-")[1]) === 'December' ? months[0] : (months.indexOf(eventDate.split("-")[1]) + 1)]
  } else if (Number(eventDate.split("-")[0]) === 30 && (eventDate.split("-")[1] === "February" || eventDate.split("-")[1] === "April" || eventDate.split("-")[1] === "June" || eventDate.split("-")[1] === "September" || eventDate.split("-")[1] === "November")){
    maxDay = 1;
    maxMonth = months[months.indexOf(eventDate.split("-")[1]) === 11 ? months[0] : (months.indexOf(eventDate.split("-")[1]) + 1)]
  } else {
    maxDay = Number(eventDate.split("-")[0]) + 1;
    maxMonth = splitDate[1];
  }
  splitDate[0] = maxDay;
  splitDate[1] = maxMonth;
  splitDate[2] = maxYear;
  console.log("splitDate", splitDate);
  return splitDate.join("-");
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth, inputDate) {
  const calendar = google.calendar({version: 'v3', auth});


  const maxDate = calculateTimeMax(inputDate);
  console.log("maxDate", maxDate);

  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date(`${inputDate} 07:00 UTC`)).toISOString(),
    timeMax: (new Date(`${maxDate} 6:59 UTC`)).toISOString(),
    showDeleted: false,
    singleEvents: true, //shows recurring events
    maxResults: 10,
    orderBy: 'startTime'
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log("input Date", inputDate)
  console.log('Upcoming 10 events:');
  console.log('events', events);
  return events;
}


const sessionsCompleted = async (auth, name, startDate, endDate) => {
  const calendar = google.calendar({version: 'v3', auth});

  const formatDate = (date) => {
    let convertToArray = date.split("-");

    if (convertToArray[1] === "01") {
    
      convertToArray[1] = "January";
    } else if (convertToArray[1] === "02") {
      convertToArray[1] = "February";
    } else if (convertToArray[1] === "03") {
      convertToArray[1] = "March";
    } else if (convertToArray[1] === "04") {
      convertToArray[1] = "April";
    } else if (convertToArray[1] === "05") {
      convertToArray[1] = "May";
    } else if (convertToArray[1] === "06") {
      convertToArray[1] = "June";
    } else if (convertToArray[1] === "07") {
      convertToArray[1] = "July";
    } else if (convertToArray[1] === "08") {
      convertToArray[1] = "August";
    } else if (convertToArray[1] === "09") {
      convertToArray[1] = "September";
    } else if (convertToArray[1] === "10") {
      convertToArray[1] = "October";
    } else if (convertToArray[1] === "11") {
      convertToArray[1] = "November";
    } else if (convertToArray[1] === "12") {
      convertToArray[1] = "December";
    }

    const order = [2,1,0];
    const reorderedArray = order.map(i => convertToArray[i]).join(" ");

    return reorderedArray;
    
  };

  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date(`${formatDate(startDate)} 07:00 UTC`)).toISOString(),
    timeMax: (new Date(`${formatDate(endDate)} 6:59 UTC`)).toISOString(),
    showDeleted: false,
    singleEvents: true, //shows recurring events
    orderBy: 'startTime',
    q: `${name}`
  });

  const events = res.data.items;
  return events;
};

module.exports = function(router) {

  router.get('/listevents/:inputdate', (req, res) => {
    authorize()
      .then(results => listEvents(results, req.params["inputdate"]))
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });

  router.get('/sessionscompleted/:name/:startdate/:enddate', (req, res) => {
    authorize()
      .then(results => sessionsCompleted(results, req.params['name'], req.params['startdate'], req.params['enddate']))
      .then((results) => {
        res.send(results);
      })
      .catch(e => res.send(e));
  });

  return router;
};