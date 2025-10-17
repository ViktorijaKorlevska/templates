import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { getResourceName } from "./common";

export function createClubCrudLambdaRole(scope: Construct): iam.Role {
  const role = new iam.Role(scope, "ClubCrudLambdaRole", {
    roleName: getResourceName("club-crud-lambda"),
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
  });

  role.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
      ],
      resources: ["*"],
    })
  );

  role.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
      ],
      resources: ["*"],
    })
  );

  role.addToPolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["cognito-idp:*"],
      resources: ["*"],
    })
  );

  return role;
}
