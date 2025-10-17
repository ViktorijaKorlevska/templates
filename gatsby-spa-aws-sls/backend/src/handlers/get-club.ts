import { APIGatewayProxyHandler } from "aws-lambda";
import { getClub } from "../services/sanity";
import { validateDomain } from "../utils/domain";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const clubId = event.pathParameters?.id;
    const domain = event.queryStringParameters?.domain;

    if (!clubId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Missing club ID",
        }),
      };
    }

    if (!domain) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Domain parameter is required",
        }),
      };
    }

    // Validate the domain
    const validatedDomain = validateDomain(domain);
    const club = await getClub(clubId, validatedDomain);

    if (!club) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Club not found",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(club),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error: any) {
    console.error("Error getting club:", error);

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
