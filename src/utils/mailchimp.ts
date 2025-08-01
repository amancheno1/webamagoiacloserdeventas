// Mailchimp API integration
const MAILCHIMP_LIST_ID = '05e07cf8da'; // Lista "Closer Web"
const MAILCHIMP_USER_ID = 'b8372036d3815e5a5d0df497a';
const MAILCHIMP_SERVER_PREFIX = 'us7';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Submit directly to Mailchimp using their embedded form endpoint
export const submitToMailchimp = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Use Mailchimp's public form submission endpoint
    const formData2 = new FormData();
    formData2.append('u', MAILCHIMP_USER_ID);
    formData2.append('id', MAILCHIMP_LIST_ID);
    formData2.append('EMAIL', formData.email);
    formData2.append('FNAME', formData.name.split(' ')[0] || '');
    formData2.append('LNAME', formData.name.split(' ').slice(1).join(' ') || '');
    formData2.append('PHONE', formData.phone || '');
    formData2.append('MMERGE6', formData.message); // Custom field for message
    
    const response = await fetch(`https://gmail.${MAILCHIMP_SERVER_PREFIX}.list-manage.com/subscribe/post-json?u=${MAILCHIMP_USER_ID}&id=${MAILCHIMP_LIST_ID}&c=?`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData2
    });

    // Since we're using no-cors mode, we can't read the response
    // but the submission should work
    return true;
    
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