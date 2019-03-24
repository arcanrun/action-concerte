export default function unsplashApi(SEARCH_PHRASE = 'NONE', PAGE = 10, REGION_ID = 8) {
    //const KEY = '069e0572e4bf6c4760733f6bb075b7548b2c42370f3a64ffeed691910b32e2eb';

    const URL = `http://api.cultserv.ru/v4/events/list?session=123&region_id=${REGION_ID}&first_only=true&limit=${PAGE}`;
    return URL;
}

// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

//https://api.unsplash.com/search/photos?page=1&query=office&client_id=069e0572e4bf6c4760733f6bb075b7548b2c42370f3a64ffeed691910b32e2eb
