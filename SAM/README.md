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

### Initialising Application with SAM

We'll use sample project using sam. Run the following command inside [code](https://github.com/anshulkhare7/GrokkingServerless/tree/master/SAM/code/) directory to clone a [Nodejs app template](https://github.com/awslabs/aws-sam-cli-app-templates.git).

`sam init --runtime nodejs12.x --name app --app-template hello-world`

### CloudFormation

For deploying applications, SAM uses AWS CloudFormation. CloudFormation converts a source file describing an application infrastructure (called *template*) into a set of running, configured cloud resources (called *stack*). The *template.yaml* file is a CloudFormation template.

### Building, Packaging, and Deploying SAM


`sam build` will create a default temporary directory, .aws-sam/build and place the build contents inside it.

The next step is to bundle all the files required by each function into separate ZIP archives and upload the results to S3. Aws S3 will be our binary aretefact storage. 

`aws s3 mb s3://<bucket_name> --region ap-south-1`

Deleting a bucket

`aws s3 rm s3://<bucket_name> --recursive`

Set the bucket name in the env variable

`export BUCKET_NAME=<bucket_name>`

Zip up and upload function packages to S3

`sam package --s3-bucket $BUCKET_NAME --output-template-file output.yaml`

The generated file `output.yaml` describes the entire infrastructure and links to a packaged version of the function code. A running instace of the Cloudformation stack will be created based on this file. 

`sam deploy --template-file output.yaml --stack-name sam-test-1 --capabilities CAPABILITY_IAM`

Inspecting a stack

`aws cloudformation describe-stacks --stack-name sam-test-1`

AWS command line tools use the [JMESPath query](http://jmespath.org) syntax, which makes it possible to do complex searching, filtering and transformations of the results. 
E.g.

`aws cloudformation describe-stacks --stack-name sam-test-1 --query Stacks[].Outputs`
``aws cloudformation describe-stacks --stack-name sam-test-1 --output text --query 'Stacks[].Outputs[?OutputKey==`HelloWorldApi`][OutputValue]'`` 

To see the list of resources in a stack 

`aws cloudformation describe-stack-resources --stack-name sam-test-1`

### Logs

Retrieving logs. (Check [SAM Logs Command Reference](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-logs.html))

`sam logs -n HelloWorldFunction --stack-name sam-test-1`

Searching log. For example, the following command will show only the log lines containing the word ERROR from the last month. (For filters syntax, check the [Filter and Pattern Syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html))

`sam logs -n HelloWorldFunction --stack-name sam-test-1 --filter ERROR -s "1 month ago"`

Tailing logs.

`sam logs -n HelloWorldFunction --stack-name sam-test-1 --tail`

### Simulating Lambda Locally

Local simulation requires Docker.

`sam local start-api`

We can also use `sam local` to send events to individual Lambda functions. We just take sample events from remote CloudWatch logs and replay them locally in a simulated environment for debugging. Save the event JSON structure to event.json.

`sam local invoke HelloWorldFunction --event event.json`


