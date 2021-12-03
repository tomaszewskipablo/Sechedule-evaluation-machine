# TimeTableVisualizerAPI

## Metrics to implement

More to be added later. 

1. Metrics for the radarplot
    1. Number of classrooms free for at least 2 hours
    1. Number of classrooms free for a whole day
    1. Number of overbooked classes
    1. Number of times students need to change rooms
        1. Between classes or after one class has finished and before the next starts? 
        1. How do I know which courses are usually taught together? Need a sylabus to know that.
    1. Rate of matching between assigned classroom and requested classroom characteristics 
1. Basic barplots
    1. Number of classrooms (x) and sits (y)
    1. Number of classrooms unused (y) per day (x)
    1. Total slots needed for each week (Total slot = Sum of students that need to sit the class during the week), timeseries plot
1. Heatmap / Density map
    1. Timetable with number of classes being in that given time period (2 hours windows)
    

## Things that might be handy later
1. [Swagger for building documentation, flasgger for Flask APIs](https://github.com/flasgger/flasgger)
1. [Best practices for Flask API development](https://auth0.com/blog/best-practices-for-flask-api-development/)
