# AWS RDS Postgres
- Username: `postgres`
- Password: `postgres_password`
- database name: `fibonacci_values`

# Note:
All Elastic Beanstalk instances set up by Dockerrun.aws.json will have access to the same environment variables set up on Elastic Beanstalk

# Development:
`docker-compose -f ./docker-compose-dev.yml up --build`