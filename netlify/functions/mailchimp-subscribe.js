const mailchimp = require('@mailchimp/mailchimp_marketing');

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || '755b1aa1d0b9273ec7282c53140968b2-us7',
  server: 'us7',
});

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

    // Add member to Mailchimp list
    // Using the "closer Web" list
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID || 'closer-web', {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name.split(' ')[0] || '',
        LNAME: name.split(' ').slice(1).join(' ') || '',
        PHONE: phone || '',
        MMERGE6: message, // Custom field for message
      },
      tags: ['website-contact'],
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
        id: response.id 
      }),
    };

  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    
    // Handle specific Mailchimp errors
    if (error.response && error.response.body) {
      const errorBody = error.response.body;
      
      // Member already exists
      if (errorBody.title === 'Member Exists') {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
          },
          body: JSON.stringify({ 
            success: true, 
            message: 'Email already subscribed',
            existing: true 
          }),
        };
      }
    }

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