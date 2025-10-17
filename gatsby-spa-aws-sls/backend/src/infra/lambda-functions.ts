import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as path from "path";
import { Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import { getResourceName } from "./common";

interface LambdaFunctionsProps {
  roles: {
    clubCrudRole: iam.IRole;
  };
}

export function createLambdaFunctions(
  scope: Construct,
  props: LambdaFunctionsProps
) {
  const getClubFn = new nodejs.NodejsFunction(scope, "GetClubFunction", {
    functionName: getResourceName("get-club"),
    entry: path.join(__dirname, "../handlers/get-club.ts"),
    handler: "handler",
    runtime: lambda.Runtime.NODEJS_18_X,
    role: props.roles.clubCrudRole,
    environment: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID || "",
      SANITY_DATASET: process.env.SANITY_DATASET || "",
      SSM_SANITY_TOKEN_PATH: process.env.SSM_SANITY_TOKEN_PATH || "",
    },
  });

  const updateClubFn = new nodejs.NodejsFunction(scope, "UpdateClubFunction", {
    functionName: getResourceName("update-club"),
    entry: path.join(__dirname, "../handlers/update-club.ts"),
    handler: "handler",
    runtime: lambda.Runtime.NODEJS_18_X,
    role: props.roles.clubCrudRole,
    environment: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID || "",
      SANITY_DATASET: process.env.SANITY_DATASET || "",
      SSM_SANITY_TOKEN_PATH: process.env.SSM_SANITY_TOKEN_PATH || "",
    },
  });

  // Creates a new club in Sanity when a user confirms their email
  const createClubFn = new nodejs.NodejsFunction(scope, "CreateClubFunction", {
    functionName: getResourceName("create-club"),
    entry: path.join(__dirname, "../handlers/create-club.ts"),
    handler: "handler",
    runtime: lambda.Runtime.NODEJS_18_X,
    role: props.roles.clubCrudRole,
    environment: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID || "",
      SANITY_DATASET: process.env.SANITY_DATASET || "",
      SSM_SANITY_TOKEN_PATH: process.env.SSM_SANITY_TOKEN_PATH || "",
    },
    timeout: Duration.seconds(30),
  });

  return {
    getClubFn,
    updateClubFn,
    createClubFn,
  };
}
