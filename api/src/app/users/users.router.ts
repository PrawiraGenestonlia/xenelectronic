/* Users router
 * Originally written by Prawira Genestonlia
 * Created on 25 Feb 2022
 */

import { Body, Controller, Delete, Get, Post, Put, Path, Route, Tags } from 'tsoa';
import { getAllUser, getUser, createUser, updateUser, deleteUser, login } from './users.service';
interface IUserResponse {
  'id': number,
  'name': string,
  'roles': { 'id': number, 'role': string }[]
  ,
  'carts': { 'id': number }[]
}
@Tags('Users')
@Route('/api/users')
export class UserController extends Controller {

  @Get('/')
  public async getAllUser(): Promise<Array<IUserResponse>> {
    return getAllUser() as never
  }

  @Get('/{name}')
  public async getUser(@Path('name') name: string): Promise<IUserResponse> {
    return getUser(name) as never
  }

  @Post('/')
  public async createUser(@Body() body: { name: string, roles: string[] }): Promise<IUserResponse> {
    return createUser({ name: body.name, roles: body.roles }) as never
  }

  @Put('/{id}')
  public async updateUser(@Path('id') id: string, @Body() body: { name: string, roles: string[] }): Promise<IUserResponse> {
    return updateUser({ id: Number(id), name: body.name, roles: body.roles }) as never
  }

  @Delete('/{id}')
  public async deleteUser(@Path('id') id: string): Promise<{ message: string }> {
    return deleteUser({ id: Number(id) })
  }

  @Post('/login')
  public async login(@Body() body: { name: string }): Promise<IUserResponse> {
    return login(body.name) as never
  }

}

