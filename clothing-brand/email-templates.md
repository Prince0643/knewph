# Email Templates for knew. (Make.com)

## 1. Customer Order Confirmation Email

**Subject:** `Thank you for your order! Order {{orderId}}`

**Content Type:** Plaintext

**Content:**
```
knew. - Premium workwear meets streetwear

Hi {{customer.name}},

Thank you for your order!

ORDER #{{orderId}}

Order Summary:
{{#each products}}
- {{name}} ({{color}}) x{{quantity}} = ₱{{subtotal}}
{{/each}}

Total: ₱{{total}}
Payment: {{paymentMethod}}

Delivery Information:
Name: {{customer.name}}
Email: {{customer.email}}
Phone: {{customer.phone}}
Address: {{customer.address}}

We'll process your order shortly. You'll receive another email when your order ships.

Questions? Contact us at hello@knew.ph

---
Follow us:
Facebook: https://www.facebook.com/profile.php?id=61586052712088
Instagram: https://www.instagram.com/knew.ph

© 2025 knew. All rights reserved.
```

**To:** `{{customer.email}}`

---

## 2. Internal Order Notification Email

**Subject:** `🔔 NEW ORDER - {{orderId}} - ₱{{total}}`

**Content Type:** Plaintext

**Content:**
```
NEW ORDER RECEIVED

Order: {{orderId}}
Date: {{orderDate}}
Total: ₱{{total}}
Payment: {{paymentMethod}}

PRODUCTS:
{{#each products}}
- {{name}} ({{color}}) - Qty: {{quantity}} - ₱{{price}} each = ₱{{subtotal}}
{{/each}}

Total: ₱{{total}}

CUSTOMER:
Name: {{customer.name}}
Email: {{customer.email}}
Phone: {{customer.phone}}

DELIVERY ADDRESS:
{{customer.address}}

---
Auto-generated from knew. website
```

**To:** (your admin email address)

---

## Make.com Variable Mapping

In Make.com, map these fields from the webhook data:

| Make Field | Variable |
|------------|----------|
| To (Customer) | `{{customer.email}}` |
| To (Admin) | your-email@example.com |
| Subject | See above |
| Content | See above |

**Available Variables:**
- `{{orderId}}` - Order ID
- `{{orderDate}}` - Order date
- `{{total}}` - Total amount
- `{{paymentMethod}}` - Cash on Delivery (COD)
- `{{customer.name}}` - Customer name
- `{{customer.email}}` - Customer email
- `{{customer.phone}}` - Customer phone
- `{{customer.address}}` - Delivery address
- `{{#each products}}` - Loop through products
  - `{{name}}` - Product name
  - `{{color}}` - Product color
  - `{{quantity}}` - Quantity
  - `{{price}}` - Unit price
  - `{{subtotal}}` - Line total

---

## How to Set Up in Make.com

1. **Add Webhook Module** - Use URL: `https://hook.eu1.make.com/3km4koxm0hmok9gkijy921fykk1iiu4u`
2. **Add Email Module** - Connect your email (Gmail, Outlook, etc.)
3. **Copy the template** into the Content field
4. **Map variables** using the purple "Map" button next to each field
5. **Add a Router** to send two emails:
   - Path 1: Customer email (To: `{{customer.email}}`)
   - Path 2: Admin email (To: your email)
6. **Save and activate**

Done!
