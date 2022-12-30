import { z } from 'zod';

const payload = {
	body: z.object({
		date: z.preprocess(
			(arg) => {
				if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
			},
			z.date({
				required_error: 'Date is required',
				invalid_type_error: 'Invalid Date Type',
			})
		),
	}),
};

const pathParams = {
	params: z.object({
		recordId: z.string({
			required_error: 'recordId is required',
		}),
	}),
};

const queryParams = {
	query: z.object({
		habitId: z.string({
			required_error: 'habitId is required',
		}),
	}),
};

export const createRecordSchema = z.object({
	...payload,
	...queryParams,
});

export const indexRecordSchema = z.object({
	...queryParams,
});

export const showRecordSchema = z.object({
	...pathParams,
});

export const destroyRecordSchema = z.object({
	...pathParams,
});

export const uploadRecordSchema = z.object({
	...pathParams,
});

export type createRecordInput = z.TypeOf<typeof createRecordSchema>;
export type indexRecordInput = z.TypeOf<typeof indexRecordSchema>;
export type showRecordInput = z.TypeOf<typeof showRecordSchema>;
export type destroyRecordInput = z.TypeOf<typeof destroyRecordSchema>;
export type uploadRecordInput = z.TypeOf<typeof uploadRecordSchema>;
