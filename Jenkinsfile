pipeline {
    agent any
    stages  {

        stage("检出") {
            steps {
                checkout(
                    [$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
                    userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]]
                )
            }
        }

        stage("安装") {
            steps {
                echo "构建中..."
                sh 'docker version'
                // 请在这里放置您项目代码的单元测试调用过程，例如:
                // sh 'mvn package' // mvn 示例
                // sh 'make' // make 示例
                sh 'npm i'
                sh 'npm rebuild'
                echo "构建完成."

                // 演示怎样产生构建物
                script{
                    def exists = fileExists 'README.md'
                    if (!exists) {
                        writeFile(file: 'README.md', text: 'Helloworld')
                    }
                }
                archiveArtifacts artifacts: 'README.md', fingerprint: true

                // archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true // 收集构建产物
            }
        }

        stage("测试") {
            steps {
                echo "单元测试中..."
                // 请在这里放置您项目代码的单元测试调用过程，例如:
                // sh 'mvn test' // mvn 示例
                // sh 'make test' // make 示例
                sh 'npm test'
                echo "单元测试完成."
            }
        }

        stage('发包') {
            steps {
                sh 'NODE_ENV=production npm run build'
                sh 'npx semantic-release --debug --no-dry-run --no-ci --unsafe-perm'
            }
        }

        stage('发布 StoryBook') {
            steps {
                sh 'npm run build-storybook'
                sh 'npm run deploy-storybook'
            }
        }
    }
    environment {
    }
}
