import './register-aliases';
import { initializeBackend } from './init';

initializeBackend();

import { getUser } from './functions/user/getUser.function';
export { getUser };
