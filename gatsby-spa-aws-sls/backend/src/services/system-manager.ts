import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({ region: process.env.AWS_REGION });

export const getParameter = async (name: string, withDecryption = true): Promise<string> => {
  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: withDecryption,
  });

  try {
    const response = await ssm.send(command);
    return response.Parameter?.Value || '';
  } catch (error) {
    console.error(`Error getting parameter ${name}:`, error);
    throw error;
  }
};
