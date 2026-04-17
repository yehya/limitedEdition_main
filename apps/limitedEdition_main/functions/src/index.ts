import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createOrder } from './functions/createOrder';
import { getOrder } from './functions/getOrder';
import { getProducts } from './functions/getProducts';
import { getProduct } from './functions/getProduct';
import { updateProduct } from './functions/updateProduct';
import { deleteProduct } from './functions/deleteProduct';
import { updateOrderStatus } from './functions/updateOrderStatus';

admin.initializeApp();

export const createOrderFn = functions.https.onCall(createOrder);
export const getOrderFn = functions.https.onCall(getOrder);
export const getProductsFn = functions.https.onCall(getProducts);
export const getProductFn = functions.https.onCall(getProduct);
export const updateProductFn = functions.https.onCall(updateProduct);
export const deleteProductFn = functions.https.onCall(deleteProduct);
export const updateOrderStatusFn = functions.https.onCall(updateOrderStatus);
