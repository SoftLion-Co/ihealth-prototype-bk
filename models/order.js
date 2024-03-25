const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  note: String,
  taxes_included: Boolean,
  currency: String,
  invoice_sent_at: Date,
  created_at: Date,
  updated_at: Date,
  tax_exempt: Boolean,
  completed_at: Date,
  name: String,
  status: String,
  line_items: [
    {
      id: Number,
      variant_id: Number,
      product_id: Number,
      title: String,
      variant_title: String,
      sku: String,
      vendor: String,
      quantity: Number,
      requires_shipping: Boolean,
      taxable: Boolean,
      gift_card: Boolean,
      fulfillment_service: String,
      grams: Number,
      tax_lines: [
        {
          rate: Number,
          title: String,
          price: String
        }
      ],
      applied_discount: String,
      name: String,
      properties: [],
      custom: Boolean,
      price: String,
      admin_graphql_api_id: String
    }
  ],
  shipping_address: {
    province: String,
    country: String,
    company: String,
    country_code: String,
    province_code: String
  },
  billing_address: {
    province: String,
    country: String,
    latitude: Number,
    longitude: Number,
    country_code: String,
    province_code: String
  },
  invoice_url: String,
  applied_discount: String,
  order_id: Number,
  shipping_line: String,
  tax_lines: [
    {
      rate: Number,
      title: String,
      price: String
    }
  ],
  tags: String,
  note_attributes: [],
  total_price: String,
  subtotal_price: String,
  total_tax: String,
  payment_terms: String,
  admin_graphql_api_id: String,
  customer: {
    id: Number,
    created_at: Date,
    updated_at: Date,
    orders_count: Number,
    state: String,
    total_spent: String,
    last_order_id: Number,
    note: String,
    verified_email: Boolean,
    multipass_identifier: String,
    tax_exempt: Boolean,
    tags: String,
    last_order_name: String,
    currency: String,
    accepts_marketing: Boolean,
    accepts_marketing_updated_at: Date,
    marketing_opt_in_level: String,
    tax_exemptions: [],
    email_marketing_consent: {
      state: String,
      opt_in_level: String,
      consent_updated_at: Date
    },
    sms_marketing_consent: String,
    admin_graphql_api_id: String,
    default_address: {
      id: Number,
      customer_id: Number,
      company: String,
      province: String,
      country: String,
      province_code: String,
      country_code: String,
      country_name: String,
      default: Boolean
    }
  }
}, { timestamps: true });

module.exports = model('Order', orderSchema);
