/* Users service
 * Originally written by Prawira Genestonlia
 * Created on 25 Feb 2022
 */

import { Role } from '@entity/role';
import { User } from '@entity/user';

export const getAllUser = async () => {
  return await User.find({ relations: ['roles', 'carts'] });
}

export const getUser = async (name: string) => {
  return await User.findOne({ where: { name }, relations: ['roles', 'carts'] });
}

export const createUser = async ({ name, roles }: { name: string, roles: string[] }) => {
  const _newUser = new User();
  _newUser['name'] = name;
  await _newUser.save();

  await Promise.all(roles.map(async (_role) => {
    const _new = new Role();
    _new['role'] = _role;
    _new.user = _newUser;
    return _new.save();
  }));

  return await User.findOne({
    where: { name: name },
    relations: ['roles', 'carts']
  });
}

export const updateUser = async ({ id, name, roles }: { id: number, name: string, roles: string[] }) => {
  const _updatedUser = await User.findOne({ where: { id }, relations: ['roles'] });
  if (!_updatedUser) return { message: 'User is not found!' };
  _updatedUser['name'] = name;
  await Promise.all(_updatedUser['roles']?.map(async (_role) => {
    return _role.remove();
  }));
  await _updatedUser.save();

  await Promise.all(roles.map(async (_role) => {
    const _new = new Role();
    _new['role'] = _role;
    _new.user = _updatedUser;
    return _new.save();
  }));

  return await User.findOne({
    where: { name: name },
    relations: ['roles', 'carts']
  });
}

export const deleteUser = async ({ id }: { id: number }) => {
  const foundUser = await User.findOne({ where: { id: id } });
  await foundUser?.remove();
  return { message: 'Deleted.' }
}

export const login = async (name: string) => {
  const _foundUser = await User.findOne({ where: { name }, relations: ['roles'] });
  if (_foundUser) {
    return _foundUser;
  } else {
    return await createUser({ name: name, roles: ['user'] })
  }
}