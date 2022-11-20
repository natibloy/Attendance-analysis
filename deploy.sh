#!/usr/bin/bash
# first and foremost - input checking!
# check if correct number of arguments were entered:
if [ "$#" -ne 1 ]; then
	echo "Usage: ${0} [test|prod]" >&2
	exit 1
fi
# check input spelling:
machine=$1
if [ $machine != "test" ] && [ $machine != "prod" ]; then
	echo -e "Enter the input correctly: test or prod\nUsage: ${0} [test|prod]" >&2
	exit 1
fi

echo "deploying to ${machine} machine..."
# moving test scripts so they would only copy to the test machine
mv /var/lib/jenkins/workspace/attendance-project/tests /var/lib/jenkins/tests
# making sure final-project directory exists and copying to it all the files from the git repository:
rsync -zrv --delete /var/lib/jenkins/workspace/attendance-project/ $machine:/home/ec2-user/final-project/
# connecting to the input machine and running multiple commands:
ssh -T $machine << EOF
	cd final-project/
	docker-compose down -v --rmi all --remove-orphans
	docker-compose up -d
	sleep 20
	
EOF
# if deploying to test move tests directory to test machine and run tests:
if [ $machine == "test" ]; then
	# copy the tests directory to test machine:
	#rsync -zrv --delete /var/lib/jenkins/tests/* test:/home/ec2-user/final-project/tests/
	# run tests on test machine:
	ssh -T test <<-EOF
	cd final-project/tests/
	
	docker-compose down -v --rmi all --remove-orphans
	EOF
fi

#curl -X POST localhost:3050/api

#bash test-back.sh
#bash test-front.sh