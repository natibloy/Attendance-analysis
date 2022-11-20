pipeline {
    environment {
        registry = "natibloy/attendance-project"
		registryCredential = 'docker-hub'
		dockerImage = ''
    }
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    dockerImage = docker.build("$registry:${env.BUILD_ID}", "./backend")
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push("latest")
                    }
                }
            }
        }
		stage('Clean') {
			steps {
				sh "docker rmi $registry:$BUILD_NUMBER"
			}
		}
		stage('Test') {
			steps {
                sh """cd /var/lib/jenkins/workspace/attendance-project/
                    bash deploy.sh test""".trim()
			}
		}
		stage('Prod') {
			steps {
                sh """cd /var/lib/jenkins/workspace/attendance-project/
                    bash deploy.sh prod""".trim()
			}
		}	
    }
}