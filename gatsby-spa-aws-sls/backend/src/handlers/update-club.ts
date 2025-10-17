import { APIGatewayProxyHandler } from "aws-lambda";
import { updateClub, validateClubDomain } from "../services/sanity";
import { UpdateClubInput } from "../types/club";
import { DomainService } from "../services/domain.service";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const clubId = event.pathParameters?.id;
    if (!clubId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Missing club ID",
        }),
      };
    }

    const input: UpdateClubInput = JSON.parse(event.body || "{}");

    // Validate input has at least one field to update
    if (Object.keys(input).length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "No update fields provided",
        }),
      };
    }

    // Get domain from query parameters
    const domain = event.queryStringParameters?.domain;
    if (!domain) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Domain parameter is required",
        }),
      };
    }

    // Validate domain using DomainService
    const validatedDomain = DomainService.getDomainFromQuery(event);

    // Update the club
    const updatedClub = await updateClub(clubId, input, validatedDomain);

    if (!updatedClub) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Club not found",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedClub),
    };
  } catch (error: any) {
    console.error("Error updating club:", error);

    // Handle domain validation errors
    if (error.message?.includes("does not belong to domain")) {
      return {
        statusCode: 403,
        body: JSON.stringify({
          message:
            "Access denied: Club does not belong to the specified domain",
        }),
      };
    }

    // Handle domain resolution errors
    if (error.name === "DomainResolutionError") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error.message,
        }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
