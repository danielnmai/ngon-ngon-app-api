# AWS Lambda Deployment Guide

This project is configured to be deployed as an AWS Lambda function.

## Prerequisites

1. Install AWS CLI: https://aws.amazon.com/cli/
2. Configure AWS credentials: `aws configure`

## Environment Variables

Create a `.env` file or set these environment variables in AWS Lambda:

- `DATABASE_URL` - PostgreSQL connection string
- `CLIENT_ID` - Google OAuth Client ID
- `CLIENT_SECRET` - Google OAuth Client Secret
- `STRIPE_API_KEY` - Stripe API key
- `FRONTEND_URL` - Frontend application URL
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret

## Deployment Steps

### 1. Build and Package

```bash
yarn lambda:package
```

This creates `lambda-deployment.zip` ready for upload to AWS Lambda.

### 2. Create Lambda Function (First Time)

**Create the function with environment variables:**
```bash
aws lambda create-function \
  --function-name ngon-ngon-app-api \
  --runtime nodejs20.x \
  --role <YOUR_LAMBDA_ROLE_ARN> \
  --handler dist/index.handler \
  --zip-file fileb://lambda-deployment.zip \
  --timeout 30 \
  --memory-size 512 \
  --environment Variables="{DATABASE_URL=your_url,CLIENT_ID=your_id,CLIENT_SECRET=your_secret,STRIPE_API_KEY=your_key,FRONTEND_URL=your_url}"
```

**Note:** Replace `<YOUR_LAMBDA_ROLE_ARN>` with an IAM role that has Lambda execution permissions. You may need to create this role first in the AWS Console.

### 3. Update Existing Function

For subsequent deployments:

```bash
yarn lambda:package
aws lambda update-function-code \
  --function-name ngon-ngon-app-api \
  --zip-file fileb://lambda-deployment.zip
```

### 4. Create API Gateway

You need to create an API Gateway endpoint that triggers your Lambda function.

**Option A: Using AWS Console (Easiest)**
1. Go to API Gateway in AWS Console
2. Create new HTTP API
3. Add integration to your Lambda function
4. Configure routes (e.g., `ANY /{proxy+}`)
5. Deploy the API

**Option B: Using AWS CLI**
```bash
# Create HTTP API
aws apigatewayv2 create-api \
  --name ngon-ngon-api \
  --protocol-type HTTP

# Create Lambda integration
aws apigatewayv2 create-integration \
  --api-id <API_ID> \
  --integration-type AWS_PROXY \
  --integration-uri arn:aws:lambda:REGION:ACCOUNT:function:ngon-ngon-app-api

# Create route
aws apigatewayv2 create-route \
  --api-id <API_ID> \
  --route-key "ANY /{proxy+}" \
  --target "integrations/<INTEGRATION_ID>"

# Deploy API
aws apigatewayv2 create-stage \
  --api-id <API_ID> \
  --stage-name prod
```

## Build Artifacts

- `lambda-deployment.zip` - Built Lambda deployment package (add to .gitignore)
- `dist/` - Compiled TypeScript output (add to .gitignore)

## Important Notes

### Prisma Connection Pooling

The application uses a Prisma singleton pattern to handle Lambda's connection pooling. The `src/utils/prisma.ts` file ensures proper connection management in the serverless environment.

### Cold Starts

Lambda functions may experience cold starts. Consider:
- Increasing memory allocation when creating the function (use `--memory-size` flag)
- Using provisioned concurrency for production
- Enabling Lambda snapstart if available (Java only)

### Environment Variables

Environment variables should be set when creating the Lambda function using the `--environment Variables` flag. To update them later:

```bash
aws lambda update-function-configuration \
  --function-name ngon-ngon-app-api \
  --environment Variables="{DATABASE_URL=...,CLIENT_ID=...}"
```

### Webhook Endpoint

The webhook endpoint at `/webhook` needs to be configured in Stripe to point to your Lambda function URL. The URL will be your API Gateway endpoint + `/v1/webhook`.

For example: `https://<api-gateway-id>.execute-api.<region>.amazonaws.com/v1/webhook`

## Troubleshooting

### Connection Timeout

If you encounter connection timeouts with Prisma:
- Verify DATABASE_URL is correct
- Check database security group allows Lambda IPs
- Consider using RDS Proxy for connection pooling

### Build Errors

If build fails:
- Ensure all dependencies are installed: `yarn install`
- Try cleaning build artifacts: `rm -rf dist lambda-deployment.zip`
- Rebuild: `yarn lambda:build`

### Deployment Errors

- Check IAM permissions for Lambda and API Gateway
- Verify AWS credentials: `aws sts get-caller-identity`
- Verify the Lambda function exists: `aws lambda get-function --function-name ngon-ngon-app-api`

## Package Size

The deployment package includes:
- Compiled JavaScript from `dist/`
- node_modules (excluding devDependencies)
- Prisma Client

If the package exceeds Lambda's 250MB unzipped limit:
- Consider using Lambda Layers for large dependencies like Prisma
- Optimize dependencies
- Use Lambda Container Images instead of zip deployment

