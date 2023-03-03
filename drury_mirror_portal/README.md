This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Nginx

Make sure that node and mysql are installed and configured properly.  
And that there are articles available

-   Install nginx `sudo apt install nginx`
-   Create a copy of and then edit /etc/nginx/sites-available/default to contain the following

` server {

# the name of your domain, www is optional.

server_name my-domain.com www.my-domain.com;

location / { # this must stay localhost. The port must be the same as your Next.js project
proxy_pass http://localhost:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}

# simple headers

add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Frame-Options DENY always;

# this will serve the project on port 80

listen 80;
}`

-   clone the project
-   install dependencies
-   run the command `npm run build` and fix potential errors
-   install pm2 https://pm2.keymetrics.io/docs/usage/quick-start/
    `run start` is the command that will be executed.  
    pm2 start npm --name my-project -- run start

## local env

make sure that the NEXTAUTH_URL is set to "http://<IP_ADDRESS>:<PORT>"  
and that the next_auth file points the url to the correct api endpoint.

## To log in.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
