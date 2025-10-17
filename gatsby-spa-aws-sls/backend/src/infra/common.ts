interface ResourceNameOptions {
  domain?: string;
  includeDomain?: boolean;
}

export const getResourceName = (
  name: string,
  options: ResourceNameOptions = {}
): string => {
  const product = process.env.PRODUCT || "skillstation";
  const env = process.env.ENVIRONMENT || "dev";

  // Only used for resources that need domain in the name
  if (options.includeDomain && options.domain) {
    return `${product}-${env}-${options.domain}-${name}`;
  }

  // For shared resources that don't need domain in the name
  return `${product}-${env}-${name}`;
};

export const getResourceTags = (
  product: string,
  environment: string,
  domain?: string
) => ({
  Product: product,
  Environment: environment,
  ...(domain && { Domain: domain }),
});
