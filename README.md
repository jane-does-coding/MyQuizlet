# My Quizlet

<img width="762" alt="Screenshot 2024-08-29 at 7 50 14 AM" src="https://github.com/user-attachments/assets/78fa4991-1116-4fce-adbb-150d825a4ca4">

Similar website to the quizlet except for with many changes, I decided to add

## Technologies used

[![Technologies](https://skillicons.dev/icons?i=ts,tailwind,nextjs,react,github)](https://skillicons.dev)

## Demo

Unable to deploy


## Usage

Prerequisites

- Node.js (v14 or later)
- NPM or Yarn
- A server (Linux, Windows, or macOS)

Clone the project

```
git clone https://github.com/jane-does-coding/MyQuizlet
```

Install dependencies

```
npm i
```

Create .env

```
DATABASE_URL=
NEXTAUTH_SECRET=
```

Set up prisma

```
npx prisma generate
npx prisma db push
```

Run it

```
npm run dev
```
