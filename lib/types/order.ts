export interface OrderItem {
  id?: number;
  sku: string;
  price: number;
  quantity: number;
  productId: number;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress?: ShippingAddress;
  createdAt: string;
  updatedAt?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export interface CreateOrderRequest {
  orderLineItemsDtoList: {
    sku: string;
    price: number;
    quantity: number;
    productId: number;
  }[];
}
