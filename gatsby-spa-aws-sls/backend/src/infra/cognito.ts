import * as cognito from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as cdk from "aws-cdk-lib";
import { Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { getResourceName } from "./common";
import { getValidDomains } from "../utils/domain";

interface CognitoProps {
  createClubTrigger: lambda.IFunction;
  product: string;
  environment: string;
}

/**
 * Returns the Cognito callback URL based on environment and domain
 */
function getCallbackUrl(domain: string): string {
  if (!process.env.ENVIRONMENT) {
    throw new Error("ENVIRONMENT must be set");
  }

  const env = process.env.ENVIRONMENT;
  const baseUrl =
    env === "prod"
      ? `https://skillstation.${domain}`
      : `https://${env}.skillstation.${domain}`;

  return `${baseUrl}/auth/callback`;
}

/**
 * Creates Cognito resources for all configured domains
 * Returns a mapping of domain to pool ID and vice versa
 */
export function createCognitoResources(scope: Construct, props: CognitoProps) {
  const domains = getValidDomains();
  const resources: {
    [domain: string]: {
      userPool: cognito.IUserPool;
      userPoolClient: cognito.IUserPoolClient;
    };
  } = {};

  // Create resources for each domain
  for (const domain of domains) {
    const userPool = new cognito.UserPool(scope, `${domain}ClubsUserPool`, {
      userPoolName: `${props.product}-${props.environment}-${domain}-pool`,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        club_name: new cognito.StringAttribute({ mutable: true }),
        city: new cognito.StringAttribute({ mutable: true }),
        category: new cognito.StringAttribute({ mutable: true }),
        subcategory: new cognito.StringAttribute({ mutable: true }),
        address: new cognito.StringAttribute({ mutable: true }),
        sanity_id: new cognito.StringAttribute({ mutable: true }),
      },
      lambdaTriggers: {
        postConfirmation: props.createClubTrigger,
      },
      signInCaseSensitive: false,
    });

    // Add standard tags
    Tags.of(userPool).add("Product", props.product);
    Tags.of(userPool).add("Environment", props.environment);
    Tags.of(userPool).add("Domain", domain);

    const googleProvider = new cognito.UserPoolIdentityProviderGoogle(
      scope,
      `${domain}GoogleProvider`,
      {
        userPool,
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        scopes: ["email", "profile"],
      }
    );

    const userPoolClient = userPool.addClient(`${domain}WebClient`, {
      userPoolClientName: `${props.product}-${props.environment}-${domain}-client`,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.PROFILE,
          cognito.OAuthScope.OPENID,
        ],
        callbackUrls: [
          getCallbackUrl(domain),
          "http://localhost:8000/auth/callback",
        ],
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.GOOGLE,
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
    });

    userPool.addDomain(`${domain}CognitoDomain`, {
      cognitoDomain: {
        domainPrefix: `${props.product}-${props.environment}-${domain}-auth`,
      },
    });

    // Store the resources
    resources[domain] = { userPool, userPoolClient };

    // Export the mappings to SSM Parameter Store
    new ssm.StringParameter(scope, `${domain}PoolIdParam`, {
      parameterName: `/${props.product}/${props.environment}/cognito/${domain}/poolId`,
      stringValue: userPool.userPoolId,
    });

    new ssm.StringParameter(scope, `${domain}PoolIdTodomainParam`, {
      parameterName: `/${props.product}/${props.environment}/cognito/poolId/${userPool.userPoolId}`,
      stringValue: domain,
    });
  }

  return resources;
}
