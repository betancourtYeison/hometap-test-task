# Run Both Applications using docker-compose

## Running Locally

Before start. Ensure you are in root hometap-test-task folder

To start and create container run:

    docker-compose up

To stop and remove container run:

    docker-compose down

Go to http://127.0.0.1:5001/api/status to ensure backend app is working:

```json
{
  "message": "hometap API is working"
}
```

Go to http://localhost:5002/ to ensure frontend app is working:

<img width="1728" alt="evidence" src="https://github.com/user-attachments/assets/f1d7c0f7-10b0-4c43-8ad4-5ceb631ad6e9" />
