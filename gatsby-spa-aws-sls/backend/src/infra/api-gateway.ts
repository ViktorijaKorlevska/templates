import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { getResourceName } from "./common";

interface ApiGatewayProps {
  functions: {
    getClub: lambda.IFunction;
    updateClub: lambda.IFunction;
  };
}

export function createApiGateway(scope: Construct, props: ApiGatewayProps) {
  const api = new apigateway.RestApi(scope, "ClubsApi", {
    restApiName: getResourceName("clubs-api"),
    defaultCorsPreflightOptions: {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
    },
  });

  // API Routes
  const clubs = api.root.addResource("clubs");

  const club = clubs.addResource("{id}");
  club.addMethod(
    "GET",
    new apigateway.LambdaIntegration(props.functions.getClub)
  );

  club.addMethod(
    "PUT",
    new apigateway.LambdaIntegration(props.functions.updateClub)
  );

  return api;
}
