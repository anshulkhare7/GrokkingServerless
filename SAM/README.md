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

`pip install aws-sam-cli`

### SAM configuration

1. Create a user in AWS IAM for SAM and AWS CLI. This user should have programmatic access rights.
2. Attaching following aws managed access policies to this user — 
    -  AWSLambdaFullAccess
    -  IAMFullAccess
    -  AWSCodeDeployFullAccess
    -  AmazonAPIGatewayAdministrator
    -  AWSCloudFormationFullAccess
3. Run `aws configure` and enter the values AWS Access Key ID and AWS Secret Access Key. Enter AWS region (e.g. ap-south-1, us-east-1). For default output format, enter *json* (other options are *text* or *table*)
4. Check that your credentials are correctly configured by running the command - `aws sts get-caller-identity`

### Profile

AWS CLI can store multiple combinations of access keys on the same system. A key combination is called a profile. A profile can be setup by adding the `--profile` option to the command for configuring access keys, followed by a profile name.

+   `aws configure --profile samdevelop`
+   `aws sts get-caller-identity --profile samdevelop`

## Initialising Application with SAM

We'll use sample project using sam. Run the following command inside [code]() directory to clone a [Nodejs app template](https://github.com/awslabs/aws-sam-cli-app-templates.git).

`sam init --runtime nodejs12.x --name app --app-template hello-world`

