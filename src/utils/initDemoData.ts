import { api } from './api';

export async function initDemoData() {
  try {
    // Check if demo data already exists
    const existingCustomers = await api.getCustomers();
    if (existingCustomers.customers && existingCustomers.customers.length > 0) {
      console.log('Demo data already exists');
      return;
    }

    console.log('Initializing demo data...');

    // Create demo staff
    const staff = [
      { name: 'John van Dijk', email: 'john@hellotv.nl', role: 'Senior Sales' },
      { name: 'Sarah Bakker', email: 'sarah@hellotv.nl', role: 'Sales Representative' },
      { name: 'Mike de Vries', email: 'mike@hellotv.nl', role: 'Sales Representative' },
      { name: 'Lisa Peters', email: 'lisa@hellotv.nl', role: 'Account Manager' },
    ];

    for (const person of staff) {
      await api.createStaff(person);
    }

    // Create demo customers
    const customers = [
      { name: 'MediaCorp BV', email: 'info@mediacorp.nl', phone: '020-1234567', company: 'MediaCorp BV', address: 'Amstelveenseweg 500, Amsterdam' },
      { name: 'Tech Solutions', email: 'contact@techsol.nl', phone: '010-9876543', company: 'Tech Solutions', address: 'Coolsingel 123, Rotterdam' },
      { name: 'Digital Agency NL', email: 'hello@digitalagency.nl', phone: '030-5551234', company: 'Digital Agency NL', address: 'Oudegracht 234, Utrecht' },
      { name: 'Creative Studios', email: 'info@creative.nl', phone: '040-7778888', company: 'Creative Studios', address: 'Stationsplein 12, Eindhoven' },
      { name: 'Marketing Plus', email: 'team@marketingplus.nl', phone: '070-3334455', company: 'Marketing Plus', address: 'Lange Voorhout 45, Den Haag' },
    ];

    for (const customer of customers) {
      await api.createCustomer(customer);
    }

    // Create demo inventory
    const inventory = [
      { name: 'Samsung 55" QLED TV', sku: 'TV-SAM-55Q', quantity: 25, lowStockThreshold: 10, price: 899.99, category: 'Televisies' },
      { name: 'LG 65" OLED TV', sku: 'TV-LG-65O', quantity: 8, lowStockThreshold: 10, price: 1499.99, category: 'Televisies' },
      { name: 'Sony 43" 4K TV', sku: 'TV-SON-43', quantity: 35, lowStockThreshold: 15, price: 649.99, category: 'Televisies' },
      { name: 'Philips Soundbar 5.1', sku: 'SND-PHI-51', quantity: 15, lowStockThreshold: 10, price: 299.99, category: 'Audio' },
      { name: 'Samsung Soundbar', sku: 'SND-SAM-21', quantity: 6, lowStockThreshold: 10, price: 199.99, category: 'Audio' },
      { name: 'HDMI Kabel 2m', sku: 'ACC-HDMI-2', quantity: 120, lowStockThreshold: 50, price: 12.99, category: 'Accessoires' },
      { name: 'TV Muurbeugel', sku: 'ACC-WALL-01', quantity: 45, lowStockThreshold: 20, price: 49.99, category: 'Accessoires' },
    ];

    for (const item of inventory) {
      await api.createInventoryItem(item);
    }

    // Get staff IDs for sales records
    const staffResult = await api.getStaff();
    const staffIds = staffResult.staff.map((s: any) => s.id);

    // Create demo sales over the past week
    const salesData = [
      { staffId: staffIds[0], staffName: 'John van Dijk', amount: 2399.97, customerName: 'MediaCorp BV', createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
      { staffId: staffIds[1], staffName: 'Sarah Bakker', amount: 1499.99, customerName: 'Tech Solutions', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { staffId: staffIds[0], staffName: 'John van Dijk', amount: 899.99, customerName: 'Digital Agency NL', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { staffId: staffIds[2], staffName: 'Mike de Vries', amount: 649.99, customerName: 'Creative Studios', createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { staffId: staffIds[3], staffName: 'Lisa Peters', amount: 1799.98, customerName: 'Marketing Plus', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { staffId: staffIds[1], staffName: 'Sarah Bakker', amount: 949.98, customerName: 'MediaCorp BV', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { staffId: staffIds[0], staffName: 'John van Dijk', amount: 2999.97, customerName: 'Tech Solutions', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { staffId: staffIds[2], staffName: 'Mike de Vries', amount: 1349.98, customerName: 'Digital Agency NL', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      // Today's sales
      { staffId: staffIds[0], staffName: 'John van Dijk', amount: 1799.98, customerName: 'Creative Studios', createdAt: new Date().toISOString() },
      { staffId: staffIds[1], staffName: 'Sarah Bakker', amount: 899.99, customerName: 'Marketing Plus', createdAt: new Date().toISOString() },
      { staffId: staffIds[3], staffName: 'Lisa Peters', amount: 2399.97, customerName: 'MediaCorp BV', createdAt: new Date().toISOString() },
    ];

    for (const sale of salesData) {
      await api.recordSale(sale);
    }

    // Create demo quotes
    const quotes = [
      { customerName: 'MediaCorp BV', amount: 8999.95, description: '10x Samsung 55" QLED TV', status: 'pending' },
      { customerName: 'Tech Solutions', amount: 14999.90, description: '10x LG 65" OLED TV', status: 'accepted' },
      { customerName: 'Digital Agency NL', amount: 3249.95, description: '5x Sony 43" 4K TV', status: 'pending' },
    ];

    for (const quote of quotes) {
      await api.createQuote(quote);
    }

    console.log('Demo data initialized successfully!');
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
}
