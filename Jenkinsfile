
pipeline{
    agent{
        docker{
            image "cypress/browsers:latest"
            args '--entrypoint='
        }
    }
    stages{
        
        stage('test stage'){
          steps{
            echo 'hello from jenkinsfile'
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
    post

    }

}
