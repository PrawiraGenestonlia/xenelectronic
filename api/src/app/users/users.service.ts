/* Users service
 * Originally written by Prawira Genestonlia
 * Created on 25 Feb 2022
 */

import { Role } from '@entity/role';
import { User } from '@entity/user';

export const getAllUser = async () => {
  try {
    return await User.find({ relations: ['roles', 'carts'] });
  } catch (e) {
    console.error(e);
  }
}


export const getUser = async (name: string) => {
  try {
    return await User.findOne({ where: { name }, relations: ['roles', 'carts'] });
  } catch (e) {
    console.error(e);
  }
}

export const createUser = async ({ name, roles }: { name: string, roles: string[] }) => {
  try {
    const _newUser = new User();
    _newUser['name'] = name;
    await _newUser.save();

    await Promise.all(roles.map(async (_role) => {
      try {
        const _new = new Role();
        _new['role'] = _role;
        _new.user = _newUser;
        return _new.save();
      } catch (e) {
        console.error(e);
      }
    }));

    return await User.findOne({
      where: { name: name },
      relations: ['roles', 'carts']
    });

  } catch (e) {
    console.error(e);
  }
}

export const updateUser = async ({ id, name, roles }: { id: number, name: string, roles: string[] }) => {
  try {
    const _updatedUser = await User.findOne({ where: { id }, relations: ['roles'] });
    if (!_updatedUser) return { message: 'User is not found!' };
    _updatedUser['name'] = name;
    await Promise.all(_updatedUser['roles']?.map(async (_role) => {
      try {
        return _role.remove();
      } catch (e) {
        console.error(e);
      }
    }));
    await _updatedUser.save();

    await Promise.all(roles.map(async (_role) => {
      try {
        const _new = new Role();
        _new['role'] = _role;
        _new.user = _updatedUser;
        return _new.save();
      } catch (e) {
        console.error(e);
      }
    }));

    return await User.findOne({
      where: { name: name },
      relations: ['roles']
    });

  } catch (e) {
    console.error(e);
  }
}

export const deleteUser = async ({ id }: { id: number }) => {
  try {
    const foundUser = await User.findOne({ where: { id: id } });
    return await foundUser?.remove();
  } catch (e) {
    console.error(e);
  }
}

export const login = async (name: string) => {
  try {
    const _foundUser = await User.findOne({ where: { name }, relations: ['roles', 'carts'] });
    if (_foundUser) {
      return _foundUser;
    } else {
      return await createUser({ name: name, roles: ['user'] })
    }
  } catch (e) {
    console.error(e);
  }
}