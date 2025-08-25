pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/nokam397/sauce_demo_cypress.git'
            }
        }

        stage('Test') {
            steps {
                echo 'Jenkinsfile trouvé et repo cloné avec succès !'
            }
        }
    }
}
