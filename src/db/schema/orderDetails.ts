import { mysqlTable, int, float } from 'drizzle-orm/mysql-core';
import { orders } from './orders';
import { products } from './products';
import { InferModel } from 'drizzle-orm';
import { Product } from './products';
//import { orders } from "./orders";
//import { products } from "./products";

export const orderDetails = mysqlTable('orderDetails', {
  id: int('id').autoincrement().primaryKey().notNull(),
  orderId: int('orderId')
    .references(() => orders.id)
    .notNull(),
  unitPrice: float('unitPrice'),
  quantity: int('quantity'),
  discount: float('discount'),
  productId: int('productId')
    .references(() => products.id)
    .notNull(),
});

export type OrderDetail = { orderDetails: InferModel<typeof orderDetails, 'select'>; products: Product | null };
