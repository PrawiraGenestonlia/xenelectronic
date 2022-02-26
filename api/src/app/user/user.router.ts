/* User router
 * Originally written by Prawira Genestonlia
 * Created on 25 Feb 2022
 */

import { Body, Controller, Delete, Get, Post, Put, Path, Route, Tags } from 'tsoa';
import { getAllUser, getUser, createUser, updateUser, deleteUser } from './user.service';

@Tags('User')
@Route('/api/user')
export class UserController extends Controller {

  @Get('/get/')
  public async getAllUser() {
    return getAllUser()
  }

  @Get('/get/{name}')
  public async getUser(@Path('name') name: string) {
    return getUser(name)
  }

  @Post('/create/')
  public async createUser(@Body() body: { name: string, roles: string[] }) {
    return createUser({ name: body.name, roles: body.roles });
  }

  @Put('/update/{id}/')
  public async updateUser(@Path('id') id: string, @Body() body: { name: string, roles: string[] }) {
    return updateUser({ id: Number(id), name: body.name, roles: body.roles });
  }

  @Delete('/delete/{id}/')
  public async deleteUser(@Path('id') id: string) {
    return deleteUser({ id: Number(id) });
  }

}

