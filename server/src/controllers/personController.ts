import { Person } from '../models/Person.js';
import { singletonController } from './factory.js';

export const getPerson = singletonController(Person, 'Person', { populate: 'profileImage' });
