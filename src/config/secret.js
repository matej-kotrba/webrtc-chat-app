export default {
	type: import.meta.env.VITE_ADMIN_FIREBASE_TYPE,
	project_id: import.meta.env.VITE_ADMIN_FIREBASE_ID,
	private_key_id: import.meta.env.VITE_ADMIN_FIREBASE_KEY_ID,
	private_key: import.meta.env.VITE_ADMIN_FIREBASE_KEY,
	client_email: import.meta.env.VITE_ADMIN_FIREBASE_CLIENT_EMAIL,
	client_id: import.meta.env.VITE_ADMIN_FIREBASE_CLIENT_ID,
	auth_uri: import.meta.env.VITE_ADMIN_FIREBASE_AUTH_URI,
	token_uri: import.meta.env.VITE_ADMIN_FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: import.meta.env
		.VITE_ADMIN_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: import.meta.env.VITE_ADMIN_FIREBASE_CLIENT_x509_CERT_URL
};
