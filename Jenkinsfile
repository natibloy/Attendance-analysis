pipeline {
    environment {
        backRegistry = "natibloy/attendance-project"
		registryCredential = 'docker-hub'
		backDockerImage = ''
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
                    backDockerImage = docker.build("$backRegistry:${env.BUILD_ID}:latest", "./backend")
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        backDockerImage.push()
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
    post {
        // clean workspace after build
        always {
            cleanWs(deleteDirs: true,
                    patterns: [[pattern: 'environmentals', type: 'EXCLUDE']])
        }
    }
}