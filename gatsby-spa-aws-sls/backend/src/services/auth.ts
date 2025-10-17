import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

export const updateUserSanityId = async (
  userPoolId: string,
  username: string,
  sanityId: string
) => {
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: userPoolId,
    Username: username,
    UserAttributes: [
      {
        Name: "custom:sanity_id",
        Value: sanityId,
      },
    ],
  });

  await cognito.send(command);
};

export const getUserBySanityId = async (
  userPoolId: string,
  sanityId: string
) => {
  const command = new AdminGetUserCommand({
    UserPoolId: userPoolId,
    Username: sanityId,
  });

  try {
    const response = await cognito.send(command);
    return response.UserAttributes;
  } catch (error) {
    return null;
  }
};
