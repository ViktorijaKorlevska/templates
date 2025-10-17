import { config } from "dotenv";
import { resolve } from "path";
import { spawnSync } from "child_process";

const deploy = () => {
  const env = process.argv[2];
  if (!env) {
    console.error("Please specify environment (mk-dev or mk-prod)");
    process.exit(1);
  }

  // Load environment variables
  const envPath = resolve(__dirname, `../env/${env}.env`);
  config({ path: envPath });

  // Deploy the stack
  const result = spawnSync("cdk", ["deploy", "--require-approval", "never"], {
    stdio: "inherit",
    env: {
      ...process.env,
      CDK_DEFAULT_ACCOUNT: process.env.AWS_ACCOUNT_ID,
      CDK_DEFAULT_REGION: process.env.AWS_REGION || "eu-central-1",
    },
  });

  if (result.status !== 0) {
    console.error("Deployment failed");
    process.exit(1);
  }
};

deploy();
