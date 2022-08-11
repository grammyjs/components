import fetch from "node-fetch";

const BASE_URL = "https://webhook.site";

export const createWebhook = async (): Promise<string> => {
  const request = await fetch(`${BASE_URL}/token`, {
    method: "post",
  });

  const { uuid: token } = (await request.json()) as { uuid: string };

  await fetch(`${BASE_URL}/token/${token}/cors/toggle`, {
    method: "put",
  });

  return token;
};

export const getWebhookEndpoint = (token: string) => `${BASE_URL}/${token}`;

export const getWebhookResults = (token: string) => `${BASE_URL}/#!/${token}`;
