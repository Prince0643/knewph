function doGet(e) {
  const data = JSON.parse(e.parameter.data);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Sheet 1: Contact/Order info
  const contactSheet = ss.getSheetByName('Contact');
  contactSheet.appendRow([
    data.customer.name,
    data.customer.email,
    data.customer.phone,
    data.customer.address,
    data.total,
    data.orderDate
  ]);
  
  // Sheet 2: Product details
  const productSheet = ss.getSheetByName('Product');
  data.products.forEach(product => {
    productSheet.appendRow([
      data.customer.name,
      product.name,
      product.color,
      product.quantity,
      product.price,
      product.subtotal,
      data.orderDate,
      product.size
    ]);
  });
  
  // Build product list for emails
  const productListHtml = data.products.map(p => 
    `<li>${p.name} (${p.color}, Size ${p.size}) x${p.quantity} - ₱${p.subtotal.toLocaleString()}</li>`
  ).join('');
  
  const productListText = data.products.map(p => 
    `- ${p.name} (${p.color}, Size ${p.size}) x${p.quantity} - ₱${p.subtotal.toLocaleString()}`
  ).join('\n');
  
  // 1. Internal notification to admin
  const adminSubject = `New Order: ${data.orderId}`;
  const adminBodyHtml = `
    <h2>New Order Received</h2>
    <p><strong>Order ID:</strong> ${data.orderId}</p>
    <p><strong>Customer:</strong> ${data.customer.name}</p>
    <p><strong>Email:</strong> ${data.customer.email}</p>
    <p><strong>Phone:</strong> ${data.customer.phone}</p>
    <p><strong>Address:</strong> ${data.customer.address}</p>
    <h3>Products:</h3>
    <ul>${productListHtml}</ul>
    <p><strong>Total:</strong> ₱${data.total.toLocaleString()}</p>
    <p><strong>Payment:</strong> ${data.paymentMethod}</p>
    <p><strong>Date:</strong> ${new Date(data.orderDate).toLocaleString()}</p>
  `;
  
  MailApp.sendEmail({
    to: 'tolentinochristian89@gmail.com',
    subject: adminSubject,
    htmlBody: adminBodyHtml,
    name: 'Above All Order Notifications'
  });
  
  // 2. Order confirmation to buyer
  const buyerSubject = `Order Confirmation - ${data.orderId}`;
  const buyerBodyHtml = `
    <h2>Thank you for your order!</h2>
    <p>Hi ${data.customer.name},</p>
    <p>We've received your order and will process it shortly.</p>
    <p><strong>Order ID:</strong> ${data.orderId}</p>
    <h3>Order Details:</h3>
    <ul>${productListHtml}</ul>
    <p><strong>Total:</strong> ₱${data.total.toLocaleString()}</p>
    <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
    <p><strong>Delivery Address:</strong><br>${data.customer.address}</p>
    <br>
    <p>If you have any questions, please contact us.</p>
    <p>- Above All Order Team</p>
  `;
  
  MailApp.sendEmail({
    to: data.customer.email,
    subject: buyerSubject,
    htmlBody: buyerBodyHtml,
    name: 'Above All Order'
  });
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}