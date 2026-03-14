// CONTEXT: Creates Firestore trigger functions. Triggers fire automatically
// when documents are created, updated, or deleted. Use for keeping data
// in sync (e.g., updating summaries, sending notifications).

import { onDocumentWritten, onDocumentCreated, onDocumentUpdated, onDocumentDeleted } from "firebase-functions/v2/firestore";
import type { FirestoreEvent } from "firebase-functions/v2/firestore";
import { logger } from '../logger.util';

/**
 * Create a Firestore document write trigger (create, update, or delete).
 * Fires on any change to the document.
 */
export const createDocumentWriteTrigger = (
  documentPath: string,
  handler: (event: FirestoreEvent<any>) => Promise<void>,
  options?: { minInstances?: number }
) => {
  return onDocumentWritten(
    {
      document: documentPath,
      minInstances: options?.minInstances ?? 0,
    },
    handler
  );
};

/**
 * Create a Firestore document create trigger.
 * Fires only when a new document is created.
 */
export const createDocumentCreateTrigger = (
  documentPath: string,
  handler: (event: FirestoreEvent<any>) => Promise<void>,
  options?: { minInstances?: number }
) => {
  return onDocumentCreated(
    {
      document: documentPath,
      minInstances: options?.minInstances ?? 0,
    },
    handler
  );
};

/**
 * Create a Firestore document update trigger.
 * Fires only when an existing document is updated.
 */
export const createDocumentUpdateTrigger = (
  documentPath: string,
  handler: (event: FirestoreEvent<any>) => Promise<void>,
  options?: { minInstances?: number }
) => {
  return onDocumentUpdated(
    {
      document: documentPath,
      minInstances: options?.minInstances ?? 0,
    },
    handler
  );
};

/**
 * Create a Firestore document delete trigger.
 * Fires only when a document is deleted.
 */
export const createDocumentDeleteTrigger = (
  documentPath: string,
  handler: (event: FirestoreEvent<any>) => Promise<void>,
  options?: { minInstances?: number }
) => {
  return onDocumentDeleted(
    {
      document: documentPath,
      minInstances: options?.minInstances ?? 0,
    },
    handler
  );
};
