
# SocialNexus

SocialNexus is a platform that allows users to showcase their social media presence by connecting all their social platforms in one place. Users can share their content, grow their audience, and track their performance.

## Folder Structure

The project is organized as follows:

```
/packages
  /frontend
    /src
      /components
      /contexts
      /pages
      /styles
  /backend
    /src
      /controllers
      /models
      /routes
      /services
```

- **frontend**: Contains the React application for the client-side.
  - **components**: Reusable UI components.
  - **contexts**: Context providers for global state management.
  - **pages**: Page components for different routes.
  - **styles**: Global and component-specific styles.

- **backend**: Contains the Node.js application for the server-side.
  - **controllers**: Handle incoming requests and return responses.
  - **models**: Database models.
  - **routes**: API endpoints.
  - **services**: Business logic and data processing.

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: JWT
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- Docker
- Docker Compose

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
# General
NODE_ENV=development
PORT=7001

# Database
DATABASE_URL=postgres://postgres:password@db:5432/platform
DB_HOST=linktree-db
DB_USER=root
DB_PASS=root123
DB_NAME=linktree

# JWT
JWT_SECRET=your_jwt_secret

# OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Running the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/socialnexus.git
   cd socialnexus
   ```

2. **Install dependencies**:
   ```bash
   cd packages/frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Start the application**:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**:
   - Frontend: `http://localhost:7070`
   - Backend: `http://localhost:7001`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
