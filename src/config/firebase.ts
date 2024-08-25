import { env } from "./env";

export const firebaseCreds = {
  type: env.type,
  project_id: env.projectId,
  private_key_id: env.privateKeyId,
  private_key: env.privateKey,
  client_email: env.clientEmail,
  client_id: env.clientId,
  auth_uri: env.authUri,
  token_uri: env.tokenUri,
  auth_provider_x509_cert_url: env.authProviderX509CertUrl,
  client_x509_cert_url: env.clientX509CertUrl,
  universe_domain: env.universeDomain,
};
