import {serve} from 'bun';

serve({
    port: 3000,
    hostname: '127.0.0.1',
    fetch(request) {
        const url = new URL(request.url)
        if(url.pathname === '/') {
            return new Response("Hello, There!", {status: 200});
        } else if(url.pathname === '/login') {
            return new Response("Yet to logged in!", {status: 200});
        } else {
            return new Response('404! Page not Found!', {status: 404});
        }
    }
}) 