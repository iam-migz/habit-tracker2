import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import RecordModel, { RecordDoc, RecordInput } from '../models/record.model';

export async function create(input: RecordInput) {
	return RecordModel.create(input);
}

export async function index(query: FilterQuery<RecordDoc>) {
	return RecordModel.find(query);
}

export async function show(query: FilterQuery<RecordDoc>) {
	return RecordModel.findOne(query);
}

export async function update(query: FilterQuery<RecordDoc>, update: UpdateQuery<RecordDoc>, options?: QueryOptions) {
	return RecordModel.updateOne(query, update, options);
}

export async function destroy(query: FilterQuery<RecordDoc>) {
	return RecordModel.deleteOne(query);
}
