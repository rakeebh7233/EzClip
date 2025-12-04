This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Future AWS Notes
### 🧠 Step 1 – Understand the Core Concepts
Goal: Get a conceptual grasp of AWS, S3, IAM, Lambda, API Gateway, and CloudFront.
Topics to Learn
* Cloud computing basics (regions, availability zones, services)
* S3: buckets, objects, permissions, presigned URLs
* IAM: users, roles, policies, keys
* Lambda: serverless functions
* API Gateway: HTTP endpoints
* CloudFront: CDN basics
* AWS SDK usage in JavaScript/TypeScript

**Recommended Resources**
* AWS Free Tier Account – set up a free account: https://aws.amazon.com/free/
* AWS Developer Guide (official docs):
    - S3: https://docs.aws.amazon.com/s3/
    - IAM: https://docs.aws.amazon.com/iam/
    - Lambda: https://docs.aws.amazon.com/lambda/
    - API Gateway: https://docs.aws.amazon.com/apigateway/
* AWS Hands-on Tutorials: https://aws.amazon.com/getting-started/hands-on/
* FreeCodeCamp AWS Beginner Tutorials (YouTube) – practical, 2–3 hour tutorials
* A Cloud Guru / Linux Academy – short courses on S3 + Lambda + API Gateway

### 🛠 Step 2 – Hands-On Learning (Build While You Learn)
Learning is fastest if you do it as you learn.
1. S3 + IAM
    - Create a bucket
    - Upload/download files via AWS console
    - Create IAM role with restricted access
2. Presigned URL Upload
    - Use AWS SDK to generate presigned URL
    - Upload a small video clip from your local machine or Next.js frontend
3. Lambda + API Gateway
    - Create a Lambda function that generates a presigned URL
    - Connect it to an API Gateway endpoint
    - Call the API from your frontend
4. CloudFront
    - Create a distribution pointing to your S3 bucket
    - Serve your uploaded clip through CloudFront
    - Test speed and playback

