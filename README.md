# Starting the Application

1. To run the project, you need to have docker installed.
2. Once docker is installed, take a look at the `.env-example` environment file, make a copy and name it `.env`
3. Update the values in the newly created `.env` file to match your preference or leave the default values for local development. 
4. Run the command `docker-compose up`. Add the `-d` flag to run docker in the background - `docker-composer up -d`
5. Once the project is running navigate to `http://localhost/`. 

# URL Paths
`http://localhost` - Points to the web application (PWA) 
`http://localhost/docs` - Displays the API docs
`http://localhost/api/*` - All APIs live behind the `/api/` prefix. 

# Ports
1. Nginx runs on Port 80
2. The main application cannot be accessed externally directly without going through nginx, however the internal port is 8000.
3. MongoDB is exposed public on port `6785`

# Run Tests
TODO

# Build process description
TODO

