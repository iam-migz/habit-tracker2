import mongoose from 'mongoose';
import config from 'config';

async function connect() {
	const dbUri = config.get<string>('dbUri');
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(dbUri);
		console.log('connected to db');
	} catch (e) {
		console.log('could not connect to db: ', e);
		process.exit(1);
	}
}

export default connect;
