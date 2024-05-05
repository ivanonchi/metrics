# Metrics web service backend

## Overview

This app uses Rails 7.1 in API mode to implement the following RESTful API endpoints:

POST /metrics
GET /metric_averages

The clients use the first endpoint to record metrics and the second to get metric averages.
Notice the endpoints point to different resources.

## Database design

The database is implemented using **PostgreSQL** due to its completeness and easiness of use with Rails. As for completeness, it has a time series extension (TimescaleDB) allowing scalability, and of course the flexibility of relational querying.

Other alternatives would be databases designed specifically for time series and metrics data such as *InfluxDB* or *Prometheus*, and also NoSQL (*MongoDB*, *Cassandra*) or Data Warehouse solutions such as *BigQuery* or *RedShift*.

The database tables are as follows.

### Metrics table

Table that stores metrics data such as metric name or recorded value. This is the raw data that is sent by the clients.

| column    | type      | description      |
| --------- | --------- | ---------------- |
| id        | pk        | record ID        |
| name      | string    | metric name      |
| value     | double    | metric value     |
| timestamp | timestamp | metric timestamp |



### MetricAverages table

Table that stores precomputed averages for a period. This table is populated by a cron job every minute.

| column    | type         | description                                                       |
| --------- | ------------ | ----------------------------------------------------------------- |
| id        | pk           | record ID                                                         |
| name      | string       | metric name                                                       |
| average   | double       | average value of the metrics recorded in the period               |
| timespan  | enum(string) | timespan for this average value. Can be 'minute', 'hour' or 'day' |
| timestamp | timestamp    | timestamp marking the beginning of the average period             |

The current implementation calculates averages for completed periods, so it lacks real-time property.

## Implementation decisions

### Average calculation cron job

As mentioned in the previous section, the averages are calculated in a cron job. This has the following benefits:

- Averages are not calculated per request, so the web server workload and latency are low.
- The average processing job can run in one worker machine or scaled to multiple machines easily.

On the other hand, there are disadvantages:

- The current implementation does not calculate the current period averages, so it lacks real-time visualization ability. Recalculation of the current live period can be implemented relatively easily so this is implementation dependent and can be solved.
- Single point of failure in case the cron job machine fails (or partial failure if the processing is distributed among multiple machines)

### Averages calculation implementation

I implemented the calculation of the averages using a generic method that calculates the averages for any timespan supported by `ActiveSupport::Duration` (second, minute, hour, day, month, year).
This is achieved using the ruby `public_send` method to call methods dynamically.

The result is a compact code that supports the average calculation of any of the mentioned timespans. One caveat is that the timespans are specified in an enum which should be modified in both the model and the database, as it is paired with the Postgresql enum data type.

Another caveat could be that due to the nature of metaprogramming, it can be harder to understand. In this case I think it is the right tradeoff as the resulting code is quite brief, and the alternative to write code for each timespan means more code to maintain, and fixing bugs can be tedious.

### Query parameters validation

I implemented query parameters validation for the GET /metric_averages endpoint using the form object pattern, which means using the ActiveRecord validation functionality in a PORO (Plain Old Ruby Object) that encapsulates the URL query parameter.

Due to time constraints, the implementation just checks for the presence of the required parameters, but could be extended easily to check if for instance the timestamps are formatted properly, the from timestamp precedes the to timestamp, the timespan has an expected value and so on.


## Setup

* Ruby version: 3.3.1 (using rbenv)

* Database: PostgreSQL

rails db:create

* How to run the test suite

bundle exec rspec

* Services (job queues, cache servers, search engines, etc.)

This app uses *whenever* gem to schedule (cron job) average calculations each minute.

Use this command to set the scheduler and get the job running each minute

```
whenever --update-crontab
```

* Deployment instructions

pending
