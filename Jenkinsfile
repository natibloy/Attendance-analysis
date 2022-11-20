pipeline {
    environment {
        backRegistry = "natibloy/attendance-project"
        //frontRegistry = "natibloy/attendance-frontend"
		registryCredential = 'docker-hub'
		backDockerImage = ''
        //frontDockerImage = ''
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
                    backDockerImage = docker.build("$backRegistry:${env.BUILD_ID}", "./backend")
                    //frontDockerImage = docker.build("$frontRegistry:${env.BUILD_ID}", "./frontend")
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        backDockerImage.push("latest")
                        //frontDockerImage.push("latest")
                    }
                }
            }
        }
		stage('Clean') {
			steps {
				sh "docker image prune -a -f"
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