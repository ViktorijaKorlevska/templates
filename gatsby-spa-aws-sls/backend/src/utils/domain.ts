/**
 * Class representing a domain validation error
 */
export class DomainResolutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainResolutionError";
  }
}

/**
 * Get the list of valid domains from environment
 */
export function getValidDomains(): string[] {
  const domains = process.env.DOMAINS;
  if (!domains) {
    throw new DomainResolutionError(
      "DOMAINS environment variable is not configured"
    );
  }
  return domains.split(",").map((d) => d.trim().toLowerCase());
}

/**
 * Check if a given domain is valid
 */
export function isValidDomain(domain?: string): boolean {
  if (!domain) {
    return false;
  }

  const validDomains = getValidDomains();
  return validDomains.includes(domain.toLowerCase());
}

/**
 * Validate and return a domain, throwing DomainResolutionError if invalid
 */
export function validateDomain(domain?: string): string {
  if (!domain) {
    throw new DomainResolutionError("Domain parameter is required");
  }

  if (!isValidDomain(domain)) {
    throw new DomainResolutionError(
      `Invalid domain: ${domain}. Valid domains are: ${getValidDomains().join(
        ", "
      )}`
    );
  }

  return domain.toLowerCase();
}

/**
 * Get domain from Cognito pool ID using SSM parameter mapping
 */
export async function getDomainFromPoolId(poolId: string): Promise<string> {
  // TODO: Implement SSM parameter store lookup
  const domain = process.env.DOMAINS?.split(",")[0];
  if (!domain) {
    throw new DomainResolutionError("Failed to resolve domain from pool ID");
  }
  return domain;
}
