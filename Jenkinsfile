pipeline {
    environment {
        backRegistry = "natibloy/attendance-project"
        frontRegistry = "natibloy/attendance-frontend"
        nginxRegistry = "natibloy/attendance-nginx"
		registryCredential = 'docker-hub'
		backDockerImage = ''
        frontDockerImage = ''
        nginxDockerImage = ''
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
                    frontDockerImage = docker.build("$frontRegistry:${env.BUILD_ID}", "./frontend")
                    nginxDockerImage = docker.build("$nginxRegistry:${env.BUILD_ID}", "./nginx")
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        backDockerImage.push("latest")
                        frontDockerImage.push("latest")
                        nginxDockerImage.push("latest")
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