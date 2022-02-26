/* Users router
 * Originally written by Prawira Genestonlia
 * Created on 25 Feb 2022
 */

import { Body, Controller, Delete, Get, Post, Put, Path, Route, Tags } from 'tsoa';
import { getAllUser, getUser, createUser, updateUser, deleteUser, login } from './users.service';

@Tags('Users')
@Route('/api/users')
export class UserController extends Controller {

  @Get('/')
  public async getAllUser() {
    return getAllUser()
  }

  @Get('/{name}')
  public async getUser(@Path('name') name: string) {
    return getUser(name)
  }

  @Post('/')
  public async createUser(@Body() body: { name: string, roles: string[] }) {
    return createUser({ name: body.name, roles: body.roles });
  }

  @Put('/{id}')
  public async updateUser(@Path('id') id: string, @Body() body: { name: string, roles: string[] }) {
    return updateUser({ id: Number(id), name: body.name, roles: body.roles });
  }

  @Delete('/{id}')
  public async deleteUser(@Path('id') id: string) {
    return deleteUser({ id: Number(id) });
  }

  @Post('/login')
  public async login(@Body() body: { name: string }) {
    return login(body.name);
  }

}

