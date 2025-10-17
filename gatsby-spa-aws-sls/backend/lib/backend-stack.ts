import { Stack, StackProps, CfnOutput, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createCognitoResources } from "../src/infra/cognito";
import { createApiGateway } from "../src/infra/api-gateway";
import { createLambdaFunctions } from "../src/infra/lambda-functions";
import { getResourceName, getResourceTags } from "../src/infra/common";
import { DEFAULT_DOMAIN } from "../src/config/domain";
import { createClubCrudLambdaRole } from "../src/infra/iam-roles";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    // Create stack name without domain as it's shared
    const stackName = getResourceName("backend");
    super(scope, id, { ...props, stackName });

    // Add common tags to all resources in the stack
    const tags = getResourceTags();
    Object.entries(tags).forEach(([key, value]) => {
      Tags.of(this).add(key, value);
    });

    // Create Lambda role - single role for all club-related functions
    const clubCrudRole = createClubCrudLambdaRole(this);

    // Create Lambda functions with roles
    const { getClubFn, updateClubFn, createClubFn } = createLambdaFunctions(
      this,
      {
        roles: {
          clubCrudRole,
        },
      }
    );

    // Create Cognito resources with createClub function as email confirmation trigger
    // For now, we only create MK pool, but structure supports multiple domains
    const { userPool, userPoolClient } = createCognitoResources(this, {
      createClubTrigger: createClubFn,
      domain: DEFAULT_DOMAIN,
    });

    // Create API Gateway with routes
    const api = createApiGateway(this, {
      functions: {
        getClub: getClubFn,
        updateClub: updateClubFn,
      },
    });

    // Outputs
    new CfnOutput(this, "UserPoolId", { value: userPool.userPoolId });
    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, "ApiUrl", { value: api.url });
  }
}
