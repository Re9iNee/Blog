import { z } from "zod";

export interface getAllParams {
  page?: number;
  query?: string;
  perPage?: number;
}

export const SelectSchema = z.coerce.number().nonnegative();
export const MultiSelectSchema = z.array(SelectSchema).default([]);
