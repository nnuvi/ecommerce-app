export const orderEmail = (order: {
  orderId: string;
  amount: number;
  status: string;
  products: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}) => {
  const productList = order.products
    .map(
      (p) =>
        `- ${p.name} (x${p.quantity}) = $${p.price * p.quantity}`
    )
    .join("\n");

  const totalItems = order.products.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  return `
🧾 Order Confirmation

Order ID: ${order.orderId}
Status: ${order.status}
Total Items: ${totalItems}
Total Amount: $${order.amount}

📦 Products:
${productList}

Thank you for your purchase!
We’ll notify you when your order is shipped.
`;
};

export const orderEmailHTML = (order: any) => {
  return `
  <div style="background:#f6f6f6;padding:20px;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:24px;border-radius:10px;font-family:Arial;">

      <h2 style="margin-bottom:20px;">🧾 Order Confirmation</h2>

      <p><b>Order ID:</b> ${order.orderId}</p>
      <p><b>Status:</b> ${order.status}</p>
      <p><b>Total:</b> $${order.amount}</p>

      <hr style="margin:20px 0;" />

      <h3>Products</h3>

      <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
        <thead>
          <tr style="background:#f0f0f0;text-align:left;">
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          ${order.products
            .map(
              (p: any) => `
              <tr>
                <td>${p.name}</td>
                <td>${p.quantity}</td>
                <td>$${p.price * p.quantity}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>

      <hr style="margin:20px 0;" />

      <p style="text-align:center;color:#666;">
        Thank you for shopping with us ❤️
      </p>

    </div>
  </div>
  `;
};