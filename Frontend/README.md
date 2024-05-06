# Metrics web service frontend

## Overview

The frontend utilizes React 18, and Vite for the development tooling.

I used React as it is the most used frontend framework in the world and I wanted to challenge myself and get more used to it, and also the extensive number of libraries and documentation available.

I chose Vite as it is known for its superb DX (fast startup, Hot Module Replacement and build times), and as for the scale of the current project, a full-fledged React framework such as Next.js would be overkill.

As for the UI, I chose the Chakra library because it is simple to use and has all the components I would need for the project.

## App structure

The app follows a standard Vite + React project structure. I enabled Typescript but I noticed I still have quite a lot to learn properly.

Due to the current project size, I am just using react states but should consider using a reducer function or libraries such as Redux, Recoil or Jotai, as the complexity increases.

### Components

#### MetricForm

The form to post metrics. I implemented the API call in the same component but extracting to a separate api module would be advisable.

### MetricsAveragesChart

This is the main component that holds the chart component and its controls. It also has the effect hook that initiates the API call to fetch MetricAverages data.

#### TimespanSelector

Radio group to select the timespan (minute, hour, day).

#### TimeRangeSlider

Slider with two knots to select the time range of metric averages to be shown in the chart.
The implementation is missing labels so there is room for ux improvement.

### API implementation

Implemented in the fetch_metrics.ts file, it handles the http request to get the metric average data, and transforms the raw data into a format that can be read by the chart library.

At the current size of the project it is OK, but I would usually implement a wrapper around the http calls, and place data transformation for visualization in a separate presenter source file.
