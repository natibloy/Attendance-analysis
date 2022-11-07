pipeline {
    agent any
    
    environment {
        image = ''
    }
    
    stages {
        stage('Build') {
            steps {
                checkout scm
            }
        }
        stage('Test') {
            steps {
                script {
                    image = docker.build("natibloy/hello-world")
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Push image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                        image.push("${env.BUILD_NUMBER}")
                        image.push("latest")
                    }
                }
            }
        }
    }
}
