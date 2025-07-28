// Mailchimp API integration
const MAILCHIMP_API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza con tu API key real
const MAILCHIMP_SERVER_PREFIX = 'us7';
const MAILCHIMP_LIST_ID = 'TU_LIST_ID_AQUI'; // Reemplaza con tu List ID real

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const submitToMailchimp = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const response = await fetch(`https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
      },
      body: JSON.stringify({
        email_address: formData.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: formData.name.split(' ')[0] || '',
          LNAME: formData.name.split(' ').slice(1).join(' ') || '',
          PHONE: formData.phone || '',
          MESSAGE: formData.message,
        },
        tags: ['website-contact'],
      }),
    });

    if (response.ok) {
      return true;
    } else {
      const errorData = await response.json();
      console.error('Mailchimp error:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Error submitting to Mailchimp:', error);
    return false;
  }
};

// Alternative method using Mailchimp's marketing API
export const addContactToMailchimp = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Since we're in a browser environment, we'll use a serverless function approach
    // This would typically be handled by a backend service
    const response = await fetch('/api/mailchimp-subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return response.ok;
  } catch (error) {
    console.error('Error adding contact to Mailchimp:', error);
    return false;
  }
};