
# NextJS To-Do List App

This project is a simple to-do list application built to demonstrate my skills with various modern web technologies. It incorporates Next.js, React.js, Prisma, TailwindCSS, and TanStack Query. You can find the entire project repository [here](https://github.com/yankes404/nextjs-todolist).

## About

The app was written to showcase the following technologies:

- **[NextJS](https://nextjs.org/)**: A React framework for server-rendered applications.
- **[ReactJS](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[Prisma](https://www.prisma.io/)**: A modern database toolkit for Node.js and TypeScript.
- **[TailwindCSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[TanStack Query](https://tanstack.com)**: A powerful data-fetching and state management tool for React applications.

## Features

- Create, edit, and delete tasks in your to-do list.
- Track task completion status.
- Responsive design using TailwindCSS.
- Optimized data-fetching and state management with TanStack Query.
- Integrated with Prisma for database management.

## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yankes404/nextjs-todolist.git
cd nextjs-todolist
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Set up your database (using Prisma):

```bash
npx prisma migrate dev --name init
```

4. Run the development server:

```bash
yarn dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## License

This project is open-source and available under the [MIT License](LICENSE).