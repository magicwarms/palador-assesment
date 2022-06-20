import { Request, Response, NextFunction } from "express";

// import {
//   convertTheReportToCSV,
//   convertSummaryReportToText,
// } from "./reconcilation.service";

export const convertReconcilationReportToCSV = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    // const csvFormat = await convertTheReportToCSV();
    return res.status(200).json({
      success: true,
      data: {},
      message: "Employees found",
    });
  } catch (err) {
    next(err);
  }
};
