import { APIGatewayProxyEvent } from "aws-lambda";
import {
  DomainResolutionError,
  validateDomain,
  getValidDomains,
} from "../utils/domain";
import { getPoolIdToDomainMapping } from "./parameter.service";

export class DomainService {
  /**
   * Get domain from API Gateway event query parameters
   * @throws {DomainResolutionError} If domain is missing or invalid
   */
  static getDomainFromQuery(event: APIGatewayProxyEvent): string {
    const domain = event.queryStringParameters?.domain;

    if (!domain) {
      throw new DomainResolutionError("Domain parameter is required");
    }

    return validateDomain(domain);
  }

  /**
   * Get domain from Cognito User Pool ID
   * @throws {DomainResolutionError} If no mapping found for pool ID
   */
  static async getDomainFromCognitoId(poolId: string): Promise<string> {
    const domain = await getPoolIdToDomainMapping(
      process.env.PRODUCT || "skillstation",
      process.env.ENVIRONMENT || "dev",
      poolId
    );

    if (!domain) {
      throw new DomainResolutionError(
        `No domain mapping found for Cognito Pool ID: ${poolId}`
      );
    }

    return validateDomain(domain);
  }

  /**
   * Get the Sanity document type for a domain
   */
  static getSanityDocumentType(domain: string): string {
    return `club_${validateDomain(domain)}`;
  }
}
