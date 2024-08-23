import * as bcrypt from 'bcrypt';
import User from '@/models/user.model';

export const passwordHook = async (user: User) => {
	if (user.password && user.changed('password')) {
		user.password = await bcrypt.hash(user.password, 10);
	}
};