## AWS SAM

The AWS Serverless Application Model (SAM) is a set of products that simplify developing, testing, and deploying applications using AWS Lambda. One part of SAM runs on developer machines and build servers, helping to prepare for deployment. 

SAM development tools help with building and packaging projects for deployment to AWS, debugging, simulating a Lambda environment, retrieving logs, and generating sample events for testing.

For troubleshooting refer to the official [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/index.html)

### Python

SAM command-line tools are actually a set of Python scripts we need Python runtime (2.7 or 3.6). We'll be using Anaconda for python virtual environments. All PIP installs should be inside our virtual environments.

### AWS CLI

We'll also need **aws cli** `pip install awscli`

### Docker

SAM tools use Docker to simulate the Lambda execution environment for local testing and debugging. The free (community) Docker Desktop tools are enough for all development tasks.

### Nodejs

We'll be deploying a [Nodejs](https://nodejs.org/en/) application to Lambda so we need Nodejs. Use [NVM](https://github.com/nvm-sh/nvm) for working with Node version 12. 

### SAM CLI

'pip install aws-sam-cli'