import { PostConfirmationTriggerHandler as CreateClubHandler } from "aws-lambda";
import { createClub } from "../services/sanity";
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { getPoolIdToDomainMapping } from "../services/parameter.service";

const cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

// This Lambda is triggered after a user confirms their email during signup
// It creates a new club in Sanity CMS and updates the user's attributes in Cognito
export const handler: CreateClubHandler = async (event) => {
  try {
    // Extract user attributes from the Cognito event
    const {
      userPoolId,
      userName,
      request: {
        userAttributes: {
          email,
          "custom:club_name": clubName,
          "custom:city": city,
          "custom:category": category,
          "custom:subcategory": subcategory,
          "custom:address": address,
          ...otherAttributes
        },
      },
    } = event;

    // Get domain from the Cognito User Pool ID
    const domain = await getPoolIdToDomainMapping(
      process.env.PRODUCT as string,
      process.env.ENVIRONMENT as string,
      userPoolId
    );

    if (!domain) {
      throw new Error(`No domain mapping found for pool ID: ${userPoolId}`);
    }

    // Create club in Sanity with domain-specific document type
    const club = await createClub(
      {
        clubName,
        email,
        city,
        category,
        subcategory,
        address,
      },
      domain
    );

    if (!club._id) {
      throw new Error("Failed to create club in Sanity");
    }

    // Update Cognito user with Sanity ID
    const updateCommand = new AdminUpdateUserAttributesCommand({
      UserPoolId: userPoolId,
      Username: userName,
      UserAttributes: [
        {
          Name: "custom:sanity_id",
          Value: club._id,
        },
      ],
    });

    await cognito.send(updateCommand);

    // Return the event to Cognito to complete the post confirmation flow
    return event;
  } catch (error: any) {
    console.error("Error in post confirmation trigger:", error);
    // Log additional context for debugging
    console.error("Event:", {
      userPoolId: event.userPoolId,
      userName: event.userName,
      attributes: event.request.userAttributes,
    });
    throw error; // This will cause Cognito to mark the confirmation as failed
  }
};
