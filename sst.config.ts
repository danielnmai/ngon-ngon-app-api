/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ngon-ngon-app-api",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const secrets = {
      DATABASE_URL: new sst.Secret("DATABASE_URL"),
      CLIENT_ID: new sst.Secret("CLIENT_ID"),
      CLIENT_SECRET: new sst.Secret("CLIENT_SECRET"),
      STRIPE_API_KEY: new sst.Secret("STRIPE_API_KEY"),
      STRIPE_PUBLIC_API_KEY: new sst.Secret("STRIPE_PUBLIC_API_KEY"),
      STRIPE_WEBHOOK_SECRET: new sst.Secret("STRIPE_WEBHOOK_SECRET"),
      FRONTEND_URL: new sst.Secret("FRONTEND_URL"),
    };

    const api = new sst.aws.Function("Api", {
      handler: "src/index.handler",
      runtime: "nodejs20.x",
      timeout: "30 seconds",
      memory: "512 MB",
      url: {
        cors: false,
      },
      environment: {
        NODE_ENV: "production",
        DATABASE_URL: secrets.DATABASE_URL.value,
        CLIENT_ID: secrets.CLIENT_ID.value,
        CLIENT_SECRET: secrets.CLIENT_SECRET.value,
        STRIPE_API_KEY: secrets.STRIPE_API_KEY.value,
        STRIPE_PUBLIC_API_KEY: secrets.STRIPE_PUBLIC_API_KEY.value,
        STRIPE_WEBHOOK_SECRET: secrets.STRIPE_WEBHOOK_SECRET.value,
        FRONTEND_URL: secrets.FRONTEND_URL.value,
      },
      nodejs: {
        esbuild: {
          external: ["@prisma/client"],
        },
      },
      copyFiles: [
        { from: "prisma/schema.prisma", to: "prisma/schema.prisma" },
        { from: "node_modules/.prisma", to: "node_modules/.prisma" },
        { from: "node_modules/@prisma/client", to: "node_modules/@prisma/client" },
      ],
    });

    return {
      api: api.url,
    };
  },
});
