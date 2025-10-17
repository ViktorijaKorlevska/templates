import { SSM } from "aws-sdk";

const ssm = new SSM();

/**
 * Get the domain to Cognito Pool ID mapping from SSM
 */
export async function getDomainToPoolIdMapping(
  product: string,
  environment: string
): Promise<Map<string, string>> {
  const mapping = new Map<string, string>();
  const domains = process.env.DOMAINS?.split(",") || [];

  for (const domain of domains) {
    const path = `/${product}/${environment}/cognito/${domain}/poolId`;
    const param = await ssm
      .getParameter({ Name: path, WithDecryption: true })
      .promise();
    if (param.Parameter?.Value) {
      mapping.set(domain, param.Parameter.Value);
    }
  }

  return mapping;
}

/**
 * Get the pool ID to domain mapping from SSM
 */
export async function getPoolIdToDomainMapping(
  product: string,
  environment: string,
  poolId: string
): Promise<string | undefined> {
  const path = `/${product}/${environment}/cognito/poolId/${poolId}`;
  const param = await ssm
    .getParameter({ Name: path, WithDecryption: true })
    .promise();
  return param.Parameter?.Value;
}
