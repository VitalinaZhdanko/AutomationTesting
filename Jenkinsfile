pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                bat 'npm install'
            }
        }
        stage('parallel') {
            parallel {
                // start several test jobs in parallel, and they all
                // will use Cypress Dashboard to load balance any found spec files
                stage('Run tests in parallel A') {
                    steps {
                        bat 'npx cypress run --record --key ed750b38-9b82-448c-9877-25b928c6c766 --parallel'
                    }
                }
                stage('Run tests in parallel B') {
                    steps {
                        bat 'npx cypress run --record --key ed750b38-9b82-448c-9877-25b928c6c766 --parallel'
                    }
                }
                stage('Run tests in parallel C') {
                    steps {
                        bat 'npx cypress run --record --key ed750b38-9b82-448c-9877-25b928c6c766 --parallel'
                    }
                }
            }
        }
    }
}