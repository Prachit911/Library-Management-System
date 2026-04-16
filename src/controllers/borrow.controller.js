import { borrowBook, BorrowServiceError } from "../services/borrow.service.js";

export async function borrowBookController(req, res) {
  try {
    const result = await borrowBook(req.body);

    if (result.type === "BORROWED") {
      return res.status(201).json({
        success: true,
        message: "Book borrowed successfully.",
        data: result
      });
    }

    return res.status(200).json({
      success: true,
      message: "No copies available. User added to waiting queue.",
      data: result
    });
  } catch (error) {
    if (error instanceof BorrowServiceError) {
      return res.status(error.statusCode).json({
        success: false,
        code: error.code,
        message: error.message
      });
    }

    console.error("Unexpected borrow controller error:", error);
    return res.status(500).json({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong while processing borrow request."
    });
  }
}
