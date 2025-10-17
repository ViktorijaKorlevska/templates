import { createClient } from "@sanity/client";
import { getParameter } from "./system-manager";
import { Club, CreateClubInput, UpdateClubInput } from "../types/club";
import { validateDomain } from "../utils/domain";
import { generateClubSlug } from "../utils/slugUtils";

const getSanityClient = async (domain: string) => {
  // Validate domain before using it in SSM path
  const validDomain = validateDomain(domain);

  // Use domain-specific SSM path
  const ssmPath =
    process.env.SSM_SANITY_TOKEN_PATH?.replace("{{domain}}", validDomain) || "";
  const token = await getParameter(ssmPath);

  if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) {
    throw new Error("Sanity configuration is missing");
  }

  return createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token,
    useCdn: false,
    apiVersion: "2021-03-25",
  });
};

/**
 * Get the Sanity document type for a domain
 */
function getSanityDocumentType(domain: string): string {
  return `club_${validateDomain(domain)}`;
}

/**
 * Create a new club in Sanity
 */
export const createClub = async (
  input: CreateClubInput,
  domain: string
): Promise<Club> => {
  const client = await getSanityClient(domain);

  // Generate the slug
  const slug = generateClubSlug(input.clubName, input.city, domain);

  const doc = {
    _type: getSanityDocumentType(domain),
    ...input,
    // Add the generated slug
    slug: {
      _type: "slug",
      current: slug,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return client.create(doc);
};

/**
 * Get a club by ID
 */
export const getClub = async (
  id: string,
  domain: string
): Promise<Club | null> => {
  const client = await getSanityClient(domain);
  const documentType = getSanityDocumentType(domain);
  return client.fetch(`*[_type == $type && _id == $id][0]`, {
    type: documentType,
    id,
  });
};

/**
 * Update a club's details
 */
export const updateClub = async (
  id: string,
  input: UpdateClubInput,
  domain: string
): Promise<Club | null> => {
  const client = await getSanityClient(domain);
  const doc = {
    ...input,
    updatedAt: new Date().toISOString(),
  };
  return client.patch(id).set(doc).commit();
};

/**
 * Validates that a club belongs to the specified domain
 * @throws Error if club doesn't exist or belongs to a different domain
 */
export const validateClubDomain = async (
  id: string,
  domain: string
): Promise<void> => {
  const client = await getSanityClient(domain);
  const documentType = getSanityDocumentType(domain);
  const result = await client.fetch(
    `*[_type == $type && _id == $id][0]._type`,
    { type: documentType, id }
  );

  if (!result) {
    throw new Error(`Club not found with ID: ${id}`);
  }

  if (result !== documentType) {
    throw new Error(`Club ${id} does not belong to domain ${domain}`);
  }
};

/**
 * Search for clubs in a specific domain
 */
export const searchClubs = async (
  domain: string,
  query: string,
  limit = 10
): Promise<Club[]> => {
  const client = await getSanityClient(domain);
  const documentType = getSanityDocumentType(domain);
  return client.fetch(
    `*[_type == $type && (clubName match $searchQuery || city match $searchQuery)][0...${limit}]`,
    {
      type: documentType,
      searchQuery: `*${query}*`,
    }
  );
};
