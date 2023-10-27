### Preparation

1. Clone repository `git clone git@github.com:mikitomi21/ShareSpace.git` 

    (or with HTTPS `git clone https://github.com/mikitomi21/ShareSpace.git`)
2. go to backend `cd backend`
3. Create virtualenv `python -m venv venv`
4. Upgrade setup tools `pip install --upgrade pip setuptools wheel`
5. Activate env and install libraries `pip install -r dependencies/requirements.txt`
6. go to ./app and execute `python manage.py runserver`


### Running locally with docker-compose 

1. Clone repository `git clone git@github.com:mikitomi21/ShareSpace.git` 

    (or with HTTPS `git clone ShareSpace`)
 
2. Install [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/).
3. Run `docker compose up`

