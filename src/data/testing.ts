/**
 * Batch testing records shown on the Testing page.
 *
 * Only mark a record as "completed" when the laboratory certificate for that
 * exact batch has been received and checked. Pending fields stay `null` and
 * are shown as "Pending".
 */

export interface TestingRecord {
  id: string;
  productLabel: string;
  status: "pending" | "completed";
  batch: string | null;
  laboratory: string | null;
  testDate: string | null;
  reportId: string | null;
  testing: string | null;
  result: string | null;
  /** Link to the full certificate (PDF in /public/documents or lab URL). */
  certificateUrl: string | null;
  /** Link where the laboratory lets customers verify the report. */
  verifyUrl: string | null;
}

export const testingRecords: TestingRecord[] = [
  {
    id: "somatropin-10iu-current-batch",
    productLabel: "Somatropin 10 IU / 3.33 mg",
    status: "pending",
    batch: null,
    laboratory: null,
    testDate: null,
    reportId: null,
    testing: null,
    result: null,
    certificateUrl: null,
    verifyUrl: null,
  },
];

export const testingFields: { key: keyof TestingRecord; label: string }[] = [
  { key: "batch", label: "Batch" },
  { key: "laboratory", label: "Laboratory" },
  { key: "testDate", label: "Test date" },
  { key: "reportId", label: "Report / sample ID" },
  { key: "testing", label: "Testing" },
  { key: "result", label: "Result" },
];
