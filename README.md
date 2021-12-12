# TimeTableVisualizerAPI

## Project TODOs

1. Add Architecture diagram 
1. Add black + flake8 to python api 
1. Add description of the problem
1. Add setup instructions
1. AWS S3 + EC2 setup with env variables

## Metrics to implement

More to be added later. 

1. Metrics for the radarplot
    1. Number of classrooms free for at least 2 hours
    1. Number of classrooms free for a whole day
        1. Function: *get_number_of_classrooms_free_for_the_whole_day*
    1. Number of overbooked classes
        1. Function: *get_total_overbook_classes
    1. Number of times students need to change rooms (Between classes or after one class has finished and before the next starts)
        1. Function: *get_total_class_changes*
    1. Total number of classes with unspecified date
        1. Function: *get_total_number_of_classes_with_unspecified_date*
    1. Rate of matching between assigned classroom and requested classroom characteristics
        1. Function:  
    1. Number of classrooms not used during the whole semester
        1. Function: *get_total_classrooms_unused_in_semester*
1. Basic barplots
    1. Number of classrooms (x) and sits (y)
    1. Number of classrooms unused (y) per day (x)
    1. Total slots needed for each week (Total slot = Sum of students that need to sit the class during the week), timeseries plot
    1. Number of classes for each weekday 
        1. Function: *get_classes_per_days*
        1. Route: 
1. Heatmap / Density map
    1. Timetable with number of classes being in that given time period (2 hours windows)
    

## Extra ideas
    1. Plot for usage of each classroom 

## Things that might be handy later
1. [Swagger for building documentation, flasgger for Flask APIs](https://github.com/flasgger/flasgger)
1. [Best practices for Flask API development](https://auth0.com/blog/best-practices-for-flask-api-development/)
