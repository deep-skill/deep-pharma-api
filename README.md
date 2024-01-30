```
docker run --rm --name deep-pharma-postgres -e POSTGRES_PASSWORD=123456 -d -p 5431:5432 postgres
```

```
docker ps
```

```
docker exec -it deep-pharma-postgres psql -U postgres
```

```
create database deep_pharma;
```