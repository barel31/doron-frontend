import axios from 'axios';

// Use your phone number here in the correct international format without the '+' or leading '0'.
const MY_PHONE_NUMBER = '972525444634'; // This is your phone number in international format

// Destructure and validate environment variables
const { GREEN_API_BASE_URL, GREEN_API_INSTANCE_ID, GREEN_API_API_TOKEN } =
  process.env;

if (!GREEN_API_BASE_URL || !GREEN_API_INSTANCE_ID || !GREEN_API_API_TOKEN) {
  throw new Error(
    'Missing environment variables: Ensure GREEN_API_BASE_URL, INSTANCE_ID, and API_TOKEN are all set.'
  );
}

export default async function sendWhatsAppMessage(
  data: ContactMeData
): Promise<WhatsAppResponse> {
  const { name, tel, email, message } = data;

  const whatsappMessage = `
🌟 *פניה חדשה ליצירת קשר מהאתר* 🌟

👤 *שם:* ${name}
📞 *טלפון:* ${tel}
✉️ *אימייל:* ${email}
${message ? `📝 *הודעה:* ${message}` : ''}
  `.trim();

  // Construct the URL for the API using valid instance ID and API token
  const url = `${GREEN_API_BASE_URL}/waInstance${GREEN_API_INSTANCE_ID}/sendMessage/${GREEN_API_API_TOKEN}`;

  const requestBody = {
    chatId: `${MY_PHONE_NUMBER}@c.us`, // Sending to your phone number
    message: whatsappMessage,
  };

  try {
    const response = await axios.post(url, requestBody);
    
    return { success: true, info: response.data };
  } catch (error: unknown) {
    console.error('Failed to send WhatsApp message:', error);

    // axios errors have a `.response` property; narrow accordingly
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
    }

    return { success: false, err: error instanceof Error ? error : new Error('Unknown error') };
  }
}
