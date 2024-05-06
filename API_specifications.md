# API Specifications

## POST /metrics

Post metric information to be stored in database.

### Parameters

| parameter | type          | description                       |
| --------- | ------------- | --------------------------------- |
| timespan  | enum (string) | One of: ['minute', 'hour', 'day'] |
| name      | string        | name of the metric                |
| value     | double        | value of the metric               |

### Response

The server returns the recorded metric information.

| field     | type            | description                           |
| --------- | --------------- | ------------------------------------- |
| id        | integer         | record ID                             |
| name      | string          | name of the metric                    |
| value     | double          | value of the metric                   |
| timestamp | string(iso8601) | timestamp of the record (server time) |

### Response example

```json
{
  "id": 7,
  "name": "nom",
  "value": 123,
  "timestamp": "2024-05-06T06:37:01.026Z"
}
```

## GET /metric_averages

Retrieves metric average information.

### Parameters

| parameter | type                  | description                                  |
| --------- | --------------------- | -------------------------------------------- |
| timespan  | enum (string)         | One of: ['minute', 'hour', 'day']            |
| from      | iso8601 date (string) | beginning of the timespan of averages to get |
| to        | iso8601 date (string) | end of the timespan of averages to get       |

### Response

The server returns an array of metric_averages records. Please note that it is similar but not the same information stored using the POST API.

| field     | type            | description                                     |
| --------- | --------------- | ----------------------------------------------- |
| id        | integer         | record ID                                       |
| name      | string          | name of the metric                              |
| average   | double          | value of the metric                             |
| timestamp | string(iso8601) | timestamp marking the beginning of the timespan |
| timespan  | enum (string)   | One of: ['minute', 'hour', 'day']               |

### Response example

```json
[
  {
    "id": 26,
    "name": "nom",
    "average": 123,
    "timespan": "minute",
    "timestamp": "2024-05-06T06:37:00.000Z"
  },
  # Rest of objects
]
```
