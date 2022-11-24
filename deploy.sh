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
	sed -i '/^REACT_APP_PUBLIC_IP/d' ./environmentals/.env
	echo "REACT_APP_PUBLIC_IP=\"http://$(curl http://checkip.amazonaws.com):5000/\"" >> ./environmentals/.env
	docker-compose down -v --rmi all --remove-orphans
	docker-compose up -d
	sleep 20
	curl -X POST localhost:5000
EOF
# if deploying to test move tests directory to test machine and run tests:
if [ $machine == "test" ]; then
	# copy the tests directory to test machine:
	rsync -zrv --delete /var/lib/jenkins/tests/* test:/home/ec2-user/final-project/tests/
	# run tests on test machine:
	ssh -T test <<-EOF
	cd final-project/tests/
	bash -ex test-back.sh
	bash -ex test-front.sh
	docker-compose down -v --rmi all --remove-orphans
	EOF
fi