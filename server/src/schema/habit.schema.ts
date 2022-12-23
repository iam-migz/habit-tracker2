import { z } from 'zod';

const payload = {
	body: z.object({
		name: z
			.string({
				required_error: 'Name is required',
			})
			.min(6, 'Name too short - 3 chars minimum'),
		description: z
			.string({
				required_error: 'description is required',
				invalid_type_error: 'Description must be a string',
			})
			.min(3, 'Description too short - 3 chars minimum'),
	}),
};

const params = {
	params: z.object({
		habitId: z.string({
			required_error: 'habitId is required',
		}),
	}),
};

export const createHabitSchema = z.object({
	...payload,
});

export const updateHabitSchema = z.object({
	...payload,
	...params,
});

export const showHabitSchema = z.object({
	...params,
});

export const destroyHabitSchema = z.object({
	...params,
});

export type createHabitInput = z.TypeOf<typeof createHabitSchema>;
export type updateHabitInput = z.TypeOf<typeof updateHabitSchema>;
export type showHabitInput = z.TypeOf<typeof showHabitSchema>;
export type destroyHabitInput = z.TypeOf<typeof destroyHabitSchema>;
