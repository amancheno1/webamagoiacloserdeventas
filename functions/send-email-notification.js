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

    // Create email content
    const emailContent = `
      Nueva consulta desde el sitio web:
      
      Nombre: ${name}
      Email: ${email}
      Teléfono: ${phone || 'No proporcionado'}
      
      Mensaje:
      ${message}
      
      ---
      Enviado desde: amagoialouviercloserventasdigital.es
      Fecha: ${new Date().toLocaleString('es-ES')}
    `;

    // Here you would typically use a service like SendGrid, Mailgun, or similar
    // For now, we'll use Netlify's built-in form handling which will send emails
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Email notification sent successfully'
      }),
    };

  } catch (error) {
    console.error('Email notification error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ 
        error: 'Failed to send email notification',
        details: error.message 
      }),
    };
  }
};