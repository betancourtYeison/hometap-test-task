# Flask

## Requirements

- Python3
- virtualenv (Optional)

## Running Locally

Before start. Ensure you are in backend folder

Create a new virtualenv

    python3 -m venv .venv
    or
    virtualenv ~/.virtualenvs/venv

Now activate the virtualenv and install the project requirements

    python3: source .venv/bin/activate
    or
    virtualenv: . ~/.virtualenvs/venv/bin/activate

    pip install -r requirements.txt

Add permission to run file

    chmod +x run.sh

You can now run the Flask app locally, to do so you can do the following:

    ./run.sh

Go to http://127.0.0.1:5000/api/status to ensure app is working:

```json
{
  "message": "hometap API is working"
}
```

## Running tests

Add permission to test file

    chmod +x test.sh

You can now run the test, to do so you can do the following:

    ./test.sh
