# SIIP

Docker environment for a Laravel project with Apache2, PHP 7.3 and Postgresql 12

## Prerequisites

To use this stack, you need a recent version of git, docker and docker-compose that works on your computer. There are a lot of tutorial on the internet that can help you installing git, docker and docker-compose. Nodejs and npm, too.

## How to install SIIP?

1. Clone the SIIP repository

```bash
git clone https://github.com/sanchezcarlosjr/SIIP.git
```

2. Create the **postgresql-data** directories

```bash
mkdir postgresql-data
```

3. Start Docker containers

```bash
cd [location where you cloned the project]/SIIP
docker-compose build && docker-compose up -d
```

4. Sync de database.

Finally, to sync the database, you need to update the .env file. An exemple is shown below :

```
    DB_CONNECTION=pgsql
    DB_HOST=pgsql
    DB_PORT=5432
    DB_DATABASE=pgdb
    DB_USERNAME=pguser
    DB_PASSWORD=pgpwd
```

## How to create a project from scratch with SIIP?

1. Create the the laravel project skeleton

From the *SIIP* folder, type this command :

```bash
docker-compose exec -u devuser php composer create-project --prefer-dist laravel/laravel /var/www/html/.
```
The command will create a Laravel project into the */var/www/html* folder in the container. This directory is mapped to the *public_html* folder on the host. The command is launched from the container to avoid having to install the development tools (Composer, Laravel) on the host. So, you keep your host clean.

2. Generate the key for the Laravel application

Next, set the application key for the Laravel application with this command :

```bash
docker-compose exec -u devuser php php artisan key:generate
```

This command will generate a key and copy it to your .env file, ensuring that your user sessions and encrypted data remain secure.

3. Sync de database.

Finally, to sync the database, you need to update the .env file. An exemple is shown below :

```
    DB_CONNECTION=pgsql
    DB_HOST=pgsql
    DB_PORT=5432
    DB_DATABASE=pgdb
    DB_USERNAME=pguser
    DB_PASSWORD=pgpwd
```

Now, type the following URL. The port is the one we set up in the docker-compose.yml - If you check the docker-compose file, you can see in the apache service section that port 8080 of the host maps port 80 of the container.

http://localhost:8080

You can connect an external database client such as pgadmin or dbeaver.

4. Use Laravel *artisan* command to create a controller:

```bash
docker-compose exec -u devuser php php artisan make:controller SomeController
```

This command will create the *SomeController.php* file into the */var/www/html/app/Http/Controllers* container directory.

##

## Docker compose cheatsheet

**Note:** you need to cd first to where your docker-compose.yml file lives.

* Start containers in the background: `docker-compose up -d`
* Start containers on the foreground: `docker-compose up`. You will see a stream of logs for every container running.
* Stop containers: `docker-compose stop`
* Kill containers: `docker-compose kill`
* View container logs: `docker-compose logs`
* Execute command inside of container: `docker-compose exec SERVICE_NAME COMMAND` where `COMMAND` is whatever you want to run. Examples:
* Open a pgsql shell, `docker-compose exec -u postgres pgsql bash`

Then you can access the database with psql command :
* `psql -U pguser -d pgdb -W`

## Docker general cheatsheet

**Note:** these are global commands and you can run them from anywhere.

* To clear containers: `docker rm -f $(docker ps -a -q)`
* To clear images: `docker rmi -f $(docker images -a -q)`
* To clear volumes: `docker volume rm $(docker volume ls -q)`
* To clear networks: `docker network rm $(docker network ls | tail -n+2 | awk '{if($2 !~ /bridge|none|host/){ print $1 }}')`