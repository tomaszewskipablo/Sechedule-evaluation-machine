# TimeTableVisualizerAPI

## Architecture diagram of the project

![Architecture diagram of the project](TimeTableSchedulerArchitectureDiagram.png)

## Project description

This project was made as a requirement to pass "Software Architecture and Design" at ISCTE. 
We would be really happy if you tried out what we made and [on this link you can do that](http://iscte-timetable-visualizer.herokuapp.com/)

*Note: as the project finishes we might have to stop the resources that make it possible to run publicly* :disappointed:

### Goal of the project
The main objective of the project was to help decision makers at ISCTE evaluate their generated schedules for the upcoming semester. This includes analysis of the given study plan and providing a frontend where users can upload their schedules and then compare the metrics that we thought are important. 

In order to do the analysis we were given two .csv files, one with the attributes of the classrooms and the other for classes. With the help of these two documents we were able to formulate a couple of metrics that we considered important. 

We believed that by visualiing these metrics we can aid the decision making of the board of the university, thus providing real value. Sadly, exchanging ideas with board members was not possible, so we had to rely on our intuition on what we think is important both for the instructors and the students themselves. Obviously, we had more experience regarding what students might not like about their study plan :sweat_smile:

### Decisions during the process

As it was a group project, it was important for us to make working together easy and fit everyones needs. During our first project planning session we realized some of us have done similar tasks before, but as we are still students and we have a lot of room to improve, we decided to try new technologies as we felt eager to learn / have some experience with them. 

As we couldn't avoid making the frontend ourselves, we decided to go with React as it's currently fairly popular and it matched our purpose. Even before the project began we assumed that the frontend will mainly be used for visualisations, and we heard about a lot of packages and libraries that will help us solve the arising problems. 

For the analysis part, we were unsure whether we could handle everything on the server-side due to scalability and compute issues, so we decided to have a small backend. This meant that we had to spin up a S3 bucket where we stored the uploaded files, but doing the analysis was still a task that was needed to be dealt with. 

As some of us already had some experience with doing data analysis in Python (plus it's widely used for this purpose), we decided to go with that. However, we still needed to connect these two parts of the infrastructure, which is where a [Flask API](https://flask.palletsprojects.com/en/2.0.x/) becomes useful. By having this API handle all the analysis of the study plans and send the calculated metrics as a json to the frontend we managed to connect these two interfaces. 

In order to make the API work, we needed a server to host it. For this, we used an [AWS](https://www.aws.com/) EC2 instance, because it was the simplest and cheapest (=free) solution. 
After setting up the security rules we managed to host our public API endpoint on this instance, and it was perfect for us. 

We were also required to host the project [on a publicly available website](http://iscte-timetable-visualizer.herokuapp.com/), which for a bit of time caused us some headache. Later we realized that deploying it with [Heroku](https://dashboard.heroku.com/) is not only free but also fairly simple.

## Setting up the infrastructure

In order to develop this project even further, you need to set up the infrastructure first (as our AWS EC2 + S3 is connected to our own account)

To do that, follow this guide.

1. Register an account on AWS
1. Set up a [billing alarm](https://console.aws.amazon.com/billing/home) 
1. Create a [free EC2 instance](https://aws.amazon.com/ec2/) - 750 free hours a month for some specific instance types (with a private key so later you can ssh into it) which will host your public API endpoint
1. Set up the [security rules](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)

Inbound rules
| IP version | Type       | Protocol | Port | Source    |
|------------|------------|----------|------|-----------|
| Ipv6       | HTTP       | TCP      | 80   | ::/0      |
| Ipv4       | HTTP       | TCP      | 80   | 0.0.0.0/0 |
| Ipv4       | SSH        | TCP      | 22   | your_ip   |
| Ipv4       | Custom TCP | TCP      | 5000 | 0.0.0.0/0 |
| Ipv4       | HTTPS      | TCP      | 443  | 0.0.0.0/0 |
| IPv6       | Custom TCP | TCP      | 5000 | ::/0      |

Outbound rules
| IP version | Type        | Protocol | Port | Source    |
|------------|-------------|----------|------|-----------|
| Ipv4       | HTTPS       | TCP      | 443  | 0.0.0.0/0 |
| Ipv4       | All traffic | All      | All  | 0.0.0.0/0 |
| Ipv4       | HTTP        | TCP      | 80   | 0.0.0.0/0 |

1. Create an [S3 bucket](https://aws.amazon.com/s3/) where you will store your .csv files
1. Once you have created the EC2 instance SSH to it with your private key, using the following command <br>
``` ssh -i "your_key.pem" ubuntu@your_public_dns```
1. After you managed to SSH into it, clone the project
1. Install the required dependencies
1. Move into the /api folder by ```cd api```
1. Start the API by first creating a new tmux session and the starting the flask app(it will run on ) <br>
``` tmux new -s api-server``` <br>
``` flask run --host=0.0.0.0 ``` <br>
You can detach from this windows by pressing ```Ctrl + B, D``` 
1. In case the endpoint doesn't work, change it to your public dns with port 5000, for example(http://ec2-1-234-567-999.eu-central-1.compute.amazonaws.com:5000/get_what_i_want)
1. In order for the AWS services to work, you need to configure your EC2 instance by running <br>
```aws configure``` 
then add your access key and secret key.
1. Make sure that your S3 and EC2 configurations inside the code are correctly set up
1. Enjoy developing ! :smile: 

## Future ideas

The project itself is far from complete, but it is fairly easy to add new features to it. 
During the implementation we came up with other ideas, most of which we couldn't implement because of the shortage of time

Some of the ideas were the following:
1. Plot usage for each classroom
1. Calculating time spent on campus because of gaps for courses that are taken together most of the time (because of curriculum)
1. Rate of matching between assigned classrooms and requested characteristics 

## Small documentation for the API 

More to be added later. 

1. Metrics for the radarplot
    1. Number of classrooms free for at least 2 hours
        1. Function: *get_total_free_hours_with_minimum_limit*
    1. Number of classrooms free for a whole day
        1. Function: *get_number_of_classrooms_free_for_the_whole_day*
    1. Number of overbooked classes
        1. Function: *get_total_overbook_classes*
    1. Number of times students need to change rooms (Between classes or after one class has finished and before the next starts)
        1. Function: *get_total_class_changes*
    1. Total number of classes with unspecified date
        1. Function: *get_total_number_of_classes_with_unspecified_date*
    1. Number of classrooms not used during the whole semester
        1. Function: *get_total_classrooms_unused_in_semester*
1. Basic barplots
    1. Number of classrooms (x) and sits (y)
        1. Function: *get_number_of_classroom_and_sits*
    1. Number of classrooms unused (y) per day (x)
        1. Function: *get_number_of_classrooms_unused_per_day*
    1. Number of classes for each weekday 
        1. Function: *get_classes_per_days*

## Things that might be handy later
1. [Swagger for building documentation, flasgger for Flask APIs](https://github.com/flasgger/flasgger)
1. [Best practices for Flask API development](https://auth0.com/blog/best-practices-for-flask-api-development/)
