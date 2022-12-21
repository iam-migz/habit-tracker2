import * as z from 'zod';

export const createUserSchema = z.object({
	body: z.object({
		name: z
			.string({
				required_error: 'Name is required',
			})
			.min(3, 'Name too short - 3 chars minimum'),
		password: z
			.string({
				required_error: 'Password is required',
			})
			.min(6, 'Password too short - 6 chars minimum'),
		email: z
			.string({
				required_error: 'Email is required',
			})
			.email('Not a valid email'),
	}),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
