# Attendance Analysis

## Description

This is my final project for the DevOps bootcamp powered by Bynet Data Communications & 8200 Alumni Associations.

The project analyses the attendance data from Webex csv files and shows the overall attendance analysis.  
In order to analize the data from the csv files I used Python programming language to scan each file and MySql to store the data.  
Since one can join a Webex meeting multiple times without an email verification, I used the Jellyfish library to attribute multiple logins to a potential participant by calculating the levenshtein distance between those logins.  

## Technologies

Project is created with:
* React version: 18.2.0
* Python version: 3.8.10
* MySql version: 8.0.30
* Flask version: 2.2.2
* Jellyfish version: 0.9.0
* Docker version: 20.10.17
* Docker-Compose version: 2.10.2
* Jenkins version: 2.375

