import prisma from "../config/prisma.js";

const BORROW_PERIOD_DAYS = 14;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

class BorrowServiceError extends Error {
  constructor(message, code, statusCode = 400) {
    super(message);
    this.name = "BorrowServiceError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

function calculateDueDate() {
  return new Date(Date.now() + BORROW_PERIOD_DAYS * DAY_IN_MS);
}

/**
 * Borrow a book or enqueue the user if no copies are available.
 *
 * @param {{ userId: string, bookId: string }} payload
 * @returns {Promise<{
 *   type: "BORROWED" | "QUEUED",
 *   borrow?: import("@prisma/client").Borrow,
 *   queueEntry?: import("@prisma/client").QueueEntry
 * }>}
 */
export async function borrowBook(payload) {
  const { userId, bookId } = payload || {};

  if (!userId || !bookId) {
    throw new BorrowServiceError(
      "Both userId and bookId are required.",
      "VALIDATION_ERROR",
      400
    );
  }

  return prisma.$transaction(async (tx) => {
    const [user, book, existingActiveBorrow, existingQueueEntry] = await Promise.all([
      tx.user.findUnique({ where: { id: userId }, select: { id: true } }),
      tx.book.findUnique({
        where: { id: bookId },
        select: { id: true, availableCopies: true }
      }),
      tx.borrow.findFirst({
        where: { userId, bookId, status: "ACTIVE" },
        select: { id: true }
      }),
      tx.queueEntry.findFirst({
        where: {
          userId,
          bookId,
          status: "WAITING"
        },
        select: { id: true }
      })
    ]);

    if (!user) {
      throw new BorrowServiceError("User not found.", "USER_NOT_FOUND", 404);
    }

    if (!book) {
      throw new BorrowServiceError("Book not found.", "BOOK_NOT_FOUND", 404);
    }

    if (existingActiveBorrow) {
      throw new BorrowServiceError(
        "User already has an active borrow for this book.",
        "ALREADY_BORROWED",
        409
      );
    }

    if (existingQueueEntry) {
      throw new BorrowServiceError(
        "User is already waiting in queue for this book.",
        "ALREADY_QUEUED",
        409
      );
    }

    if (book.availableCopies > 0) {
      const borrow = await tx.borrow.create({
        data: {
          userId,
          bookId,
          dueDate: calculateDueDate(),
          status: "ACTIVE"
        }
      });

      await tx.book.update({
        where: { id: bookId },
        data: { availableCopies: { decrement: 1 } }
      });

      return { type: "BORROWED", borrow };
    }

    const lastQueueItem = await tx.queueEntry.findFirst({
      where: { bookId, status: "WAITING" },
      orderBy: { position: "desc" },
      select: { position: true }
    });

    const queueEntry = await tx.queueEntry.create({
      data: {
        userId,
        bookId,
        position: (lastQueueItem?.position ?? 0) + 1,
        status: "WAITING"
      }
    });

    return { type: "QUEUED", queueEntry };
  });
}

export { BorrowServiceError };
