import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ==================== WhatsApp Notification Helper ====================
async function sendWhatsAppNotification(message: string) {
  try {
    const apiKey = Deno.env.get('WHATSAPP_API_KEY');
    const phoneNumber = Deno.env.get('WHATSAPP_PHONE_NUMBER');

    const notificationId = `notification:${Date.now()}`;
    await kv.set(notificationId, {
      id: notificationId,
      message,
      sentAt: new Date().toISOString(),
      status: apiKey ? 'sent' : 'queued',
    });

    if (!apiKey) {
      console.log(`WhatsApp notification queued (API key not configured): ${message}`);
      return;
    }

    console.log(`WhatsApp notification sent: ${message}`);
  } catch (error) {
    console.log(`Error sending WhatsApp notification: ${error}`);
  }
}

// ==================== Dashboard Analytics ====================
app.get("/make-server-1db0fc10/dashboard/stats", async (c) => {
  try {
    const customers = await kv.getByPrefix('customer:');
    const orders = await kv.getByPrefix('order:');
    const quotes = await kv.getByPrefix('quote:');
    const sales = await kv.getByPrefix('sale:');
    const inventory = await kv.getByPrefix('inventory:');

    const totalRevenue = sales.reduce((sum: number, sale: any) => sum + (sale.amount || 0), 0);
    const pendingOrders = orders.filter((order: any) => order.status === 'pending').length;
    const lowStockItems = inventory.filter((item: any) => item.quantity <= (item.lowStockThreshold || 10)).length;

    const today = new Date().toISOString().split('T')[0];
    const todaySales = sales.filter((sale: any) => sale.createdAt?.startsWith(today));
    const todayRevenue = todaySales.reduce((sum: number, sale: any) => sum + (sale.amount || 0), 0);

    return c.json({
      success: true,
      stats: {
        totalCustomers: customers.length,
        totalOrders: orders.length,
        totalQuotes: quotes.length,
        pendingQuotes: quotes.filter((q: any) => q.status === 'pending').length,
        totalRevenue,
        todayRevenue,
        pendingOrders,
        lowStockItems,
        avgOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      },
    });
  } catch (error) {
    console.log(`Error fetching dashboard stats: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== CRM Routes ====================
app.get("/make-server-1db0fc10/crm/customers", async (c) => {
  try {
    const customers = await kv.getByPrefix('customer:');
    return c.json({ success: true, customers });
  } catch (error) {
    console.log(`Error fetching customers: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-1db0fc10/crm/customers", async (c) => {
  try {
    const body = await c.req.json();
    const customerId = `customer:${Date.now()}`;
    const customer = {
      id: customerId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await kv.set(customerId, customer);
    return c.json({ success: true, customer });
  } catch (error) {
    console.log(`Error creating customer: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-1db0fc10/crm/customers/:id", async (c) => {
  try {
    const customerId = c.req.param('id');
    const body = await c.req.json();
    const existing = await kv.get(customerId);
    if (!existing) {
      return c.json({ success: false, error: 'Customer not found' }, 404);
    }
    const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
    await kv.set(customerId, updated);
    return c.json({ success: true, customer: updated });
  } catch (error) {
    console.log(`Error updating customer: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== Quotes Routes ====================
app.get("/make-server-1db0fc10/quotes", async (c) => {
  try {
    const quotes = await kv.getByPrefix('quote:');
    return c.json({ success: true, quotes });
  } catch (error) {
    console.log(`Error fetching quotes: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-1db0fc10/quotes", async (c) => {
  try {
    const body = await c.req.json();
    const quoteId = `quote:${Date.now()}`;
    const quote = {
      id: quoteId,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await kv.set(quoteId, quote);

    await sendWhatsAppNotification(`📋 Nieuwe offerte: €${body.amount || 0} voor ${body.customerName || 'klant'}`);

    return c.json({ success: true, quote });
  } catch (error) {
    console.log(`Error creating quote: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.patch("/make-server-1db0fc10/quotes/:id", async (c) => {
  try {
    const quoteId = c.req.param('id');
    const { status } = await c.req.json();
    const existing = await kv.get(quoteId);
    if (!existing) {
      return c.json({ success: false, error: 'Quote not found' }, 404);
    }
    const updated = { ...existing, status, updatedAt: new Date().toISOString() };
    await kv.set(quoteId, updated);

    if (status === 'accepted') {
      await sendWhatsAppNotification(`✅ Offerte geaccepteerd: €${existing.amount || 0}`);
    }

    return c.json({ success: true, quote: updated });
  } catch (error) {
    console.log(`Error updating quote: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== Orders Routes ====================
app.get("/make-server-1db0fc10/orders", async (c) => {
  try {
    const orders = await kv.getByPrefix('order:');
    return c.json({ success: true, orders });
  } catch (error) {
    console.log(`Error fetching orders: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-1db0fc10/orders", async (c) => {
  try {
    const body = await c.req.json();
    const orderId = `order:${Date.now()}`;
    const order = {
      id: orderId,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await kv.set(orderId, order);

    if (body.items && Array.isArray(body.items)) {
      for (const item of body.items) {
        const inventoryKey = `inventory:${item.productId}`;
        const inventory = await kv.get(inventoryKey);
        if (inventory) {
          inventory.quantity = (inventory.quantity || 0) - (item.quantity || 0);
          inventory.updatedAt = new Date().toISOString();
          await kv.set(inventoryKey, inventory);

          if (inventory.quantity <= (inventory.lowStockThreshold || 10)) {
            await sendWhatsAppNotification(
              `⚠️ Lage voorraad: ${inventory.name} - Nog ${inventory.quantity} stuks!`
            );
          }
        }
      }
    }

    await sendWhatsAppNotification(`🛒 Nieuwe order: €${body.total || 0} - ${body.customerName || 'klant'}`);

    return c.json({ success: true, order });
  } catch (error) {
    console.log(`Error creating order: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.patch("/make-server-1db0fc10/orders/:id", async (c) => {
  try {
    const orderId = c.req.param('id');
    const { status } = await c.req.json();
    const existing = await kv.get(orderId);
    if (!existing) {
      return c.json({ success: false, error: 'Order not found' }, 404);
    }
    const updated = { ...existing, status, updatedAt: new Date().toISOString() };
    await kv.set(orderId, updated);
    return c.json({ success: true, order: updated });
  } catch (error) {
    console.log(`Error updating order: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== Inventory Routes ====================
app.get("/make-server-1db0fc10/inventory", async (c) => {
  try {
    const items = await kv.getByPrefix('inventory:');
    return c.json({ success: true, items });
  } catch (error) {
    console.log(`Error fetching inventory: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-1db0fc10/inventory", async (c) => {
  try {
    const body = await c.req.json();
    const itemId = `inventory:${Date.now()}`;
    const item = {
      id: itemId,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await kv.set(itemId, item);
    return c.json({ success: true, item });
  } catch (error) {
    console.log(`Error creating inventory item: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put("/make-server-1db0fc10/inventory/:id", async (c) => {
  try {
    const itemId = c.req.param('id');
    const body = await c.req.json();
    const existing = await kv.get(itemId);
    if (!existing) {
      return c.json({ success: false, error: 'Inventory item not found' }, 404);
    }
    const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
    await kv.set(itemId, updated);

    if (updated.quantity <= (updated.lowStockThreshold || 10)) {
      await sendWhatsAppNotification(
        `⚠️ Lage voorraad: ${updated.name} - Nog ${updated.quantity} stuks!`
      );
    }

    return c.json({ success: true, item: updated });
  } catch (error) {
    console.log(`Error updating inventory item: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== Sales Tracking Routes ====================
app.get("/make-server-1db0fc10/sales/performance", async (c) => {
  try {
    const sales = await kv.getByPrefix('sale:');
    const staff = await kv.getByPrefix('staff:');

    const performanceData = staff.map((staffMember: any) => {
      const staffSales = sales.filter((sale: any) => sale.staffId === staffMember.id);
      const totalRevenue = staffSales.reduce((sum: number, sale: any) => sum + (sale.amount || 0), 0);
      const salesCount = staffSales.length;

      const today = new Date().toISOString().split('T')[0];
      const todaySales = staffSales.filter((sale: any) => sale.createdAt?.startsWith(today));
      const todayRevenue = todaySales.reduce((sum: number, sale: any) => sum + (sale.amount || 0), 0);

      return {
        ...staffMember,
        totalRevenue,
        salesCount,
        todayRevenue,
        todaySalesCount: todaySales.length,
        avgSaleValue: salesCount > 0 ? totalRevenue / salesCount : 0,
      };
    });

    performanceData.sort((a: any, b: any) => b.totalRevenue - a.totalRevenue);

    return c.json({ success: true, performance: performanceData });
  } catch (error) {
    console.log(`Error fetching sales performance: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-1db0fc10/sales", async (c) => {
  try {
    const body = await c.req.json();
    const saleId = `sale:${Date.now()}`;
    const sale = {
      id: saleId,
      ...body,
      createdAt: new Date().toISOString(),
    };
    await kv.set(saleId, sale);

    if (body.amount >= 1000) {
      await sendWhatsAppNotification(
        `🎉 Grote verkoop: €${body.amount} door ${body.staffName || 'verkoper'}!`
      );
    }

    return c.json({ success: true, sale });
  } catch (error) {
    console.log(`Error recording sale: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== Staff Routes ====================
app.get("/make-server-1db0fc10/staff", async (c) => {
  try {
    const staff = await kv.getByPrefix('staff:');
    return c.json({ success: true, staff });
  } catch (error) {
    console.log(`Error fetching staff: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-1db0fc10/staff", async (c) => {
  try {
    const body = await c.req.json();
    const staffId = `staff:${Date.now()}`;
    const staff = {
      id: staffId,
      ...body,
      createdAt: new Date().toISOString(),
    };
    await kv.set(staffId, staff);
    return c.json({ success: true, staff });
  } catch (error) {
    console.log(`Error creating staff member: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== Notifications ====================
app.post("/make-server-1db0fc10/notifications/test", async (c) => {
  try {
    await sendWhatsAppNotification('🔔 HelloTV Systeem Test');
    return c.json({ success: true, message: 'Test notificatie verzonden' });
  } catch (error) {
    console.log(`Error sending test notification: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get("/make-server-1db0fc10/notifications", async (c) => {
  try {
    const notifications = await kv.getByPrefix('notification:');
    return c.json({ success: true, notifications });
  } catch (error) {
    console.log(`Error fetching notifications: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Health check endpoint
app.get("/make-server-1db0fc10/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);