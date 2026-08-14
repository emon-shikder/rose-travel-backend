const submitContact = (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required fields.'
    });
  }

  console.log('New Contact Form Submission:', { name, email, phone, message });

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out! We will contact you soon.',
    receivedData: { name, email, phone, message }
  });
};

module.exports = {
  submitContact
};
