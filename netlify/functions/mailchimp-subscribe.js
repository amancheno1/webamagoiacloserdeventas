// Direct form submission to Mailchimp using form endpoint
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || '05e07cf8da';
const MAILCHIMP_USER_ID = 'b8372036d3815e5a5d0df497a';
const MAILCHIMP_SERVER = 'us7';

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Submit directly to Mailchimp form endpoint
    const formData = new URLSearchParams();
    formData.append('u', MAILCHIMP_USER_ID);
    formData.append('id', MAILCHIMP_LIST_ID);
    formData.append('EMAIL', email);
    formData.append('FNAME', name.split(' ')[0] || '');
    formData.append('LNAME', name.split(' ').slice(1).join(' ') || '');
    formData.append('PHONE', phone || '');
    formData.append('MMERGE6', message);
    
    const mailchimpUrl = `https://gmail.${MAILCHIMP_SERVER}.list-manage.com/subscribe/post`;
    
    const response = await fetch(mailchimpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to Mailchimp',
        status: response.status
      }),
    };

  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ 
        error: 'Failed to subscribe to Mailchimp',
        details: error.message 
      }),
    };
  }
};