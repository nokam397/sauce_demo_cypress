pipeline {
    agent {
        docker {
            image "cypress/browsers:latest"
            args '--entrypoint='
        }
    }
    stages {
        stage('Test stage') {
            steps {
                echo 'Hello from Jenkinsfile'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            echo 'This will always run after the pipeline'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
