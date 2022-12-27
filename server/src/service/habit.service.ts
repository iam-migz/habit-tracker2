import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import HabitModel, { HabitDoc, HabitInput } from '../models/habit.model';

export async function create(input: HabitInput) {
	return HabitModel.create(input);
}

export async function index(query: FilterQuery<HabitDoc>) {
	return HabitModel.find(query);
}

export async function show(query: FilterQuery<HabitDoc>) {
	return HabitModel.findOne(query);
}

export async function update(query: FilterQuery<HabitDoc>, update: UpdateQuery<HabitDoc>, options?: QueryOptions) {
	return HabitModel.updateOne(query, update, options);
}

export async function destroy(query: FilterQuery<HabitDoc>) {
	return HabitModel.deleteOne(query);
}
