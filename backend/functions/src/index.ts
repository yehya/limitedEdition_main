import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createOrder } from './functions/createOrder';
import { getOrder } from './functions/getOrder';
import { getProducts } from './functions/getProducts';
import { getProduct } from './functions/getProduct';
import { updateProduct } from './functions/updateProduct';
import { deleteProduct } from './functions/deleteProduct';
import { updateOrderStatus } from './functions/updateOrderStatus';
import { getOrders } from './functions/getOrders';
import { getProductsAdmin } from './functions/getProductsAdmin';
import { createProduct } from './functions/createProduct';
import { checkAdminStatus } from './functions/checkAdminStatus';

admin.initializeApp();

export const createOrderFn = functions.https.onCall(createOrder);
export const getOrderFn = functions.https.onCall(getOrder);
export const getProductsFn = functions.https.onCall(getProducts);
export const getProductFn = functions.https.onCall(getProduct);
export const updateProductFn = functions.https.onCall(updateProduct);
export const deleteProductFn = functions.https.onCall(deleteProduct);
export const updateOrderStatusFn = functions.https.onCall(updateOrderStatus);
export const getOrdersFn = functions.https.onCall(getOrders);
export const getProductsAdminFn = functions.https.onCall(getProductsAdmin);
export const createProductFn = functions.https.onCall(createProduct);
export const checkAdminStatusFn = functions.https.onCall(checkAdminStatus);
