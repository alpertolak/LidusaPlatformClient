import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from 'src/app/contracts/users/create-user';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { ListPaginationUsers } from 'src/app/contracts/users/list-pagination-users';
import { User_Is_Admin } from 'src/app/contracts/users/User-Is-Admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpClientService,
  ) { }

  async assingRoleToUser(userId: string, roles: string[], successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = this.httpService.Post({
      controller: "users",
      action: "assing-role-to-user"
    }, { userId, roles })

    //TODO en kolay http hata ayıklama yapısı
    const promisedata = firstValueFrom(observable)
    promisedata.then(successCallback).catch(errorCallback)
  }

  async getRolesToUser(userId: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<string[]> {

    const observable: Observable<{ userRoles: string[] }> = await this.httpService.Get({
      controller: "users",
      action: "get-roles-to-user",
      queryString: `UserId=${userId}`
    }, userId)

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)

    return (await promiseData).userRoles
  }

  // async getUserByIdOrName(userIdOrName: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User> {
  //   const observable: Observable<User> = await this.httpService.Get({
  //     controller: "users",
  //     action: "get-user-by-id-or-name"
  //   },userIdOrName)

  //   const promiseData = firstValueFrom(observable)
  //   promiseData.then(successCallback).catch(errorCallback)
  //   return await promiseData
  // }

  async getUserIsAdminAsync(userIdOrName: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User_Is_Admin> {
    const observable: Observable<User_Is_Admin> = await this.httpService.Get({
      controller: "users",
      action: "get-user-is-admin"
    }, userIdOrName)

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }

  async getAllUsers(page: number, size: number, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<ListPaginationUsers> {
    const observable: Observable<ListPaginationUsers> = this.httpService.Get({
      controller: "users",
      action: "get-all-users",
      queryString: `page=${page}&size=${size}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)

    return await promiseData
  }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpService.Post<Create_User | User>({
      controller: "users",
    }, user)
    return await firstValueFrom(observable) as Create_User
  }

  //GENÇAY DERS.60
  async passwordUpdate(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = this.httpService.Post({
      controller: "users",
      action: "password-update"
    }, {
      UserId: userId,
      resetToken: resetToken,
      Password: password,
      PasswordConfirm: passwordConfirm
    });
    //TODO api hata ayıklama sistemi
    try {
      const promiseData: any = await firstValueFrom(observable);
      if (successCallback) successCallback();

    } catch (error) {
      if (errorCallback) errorCallback(error);
    }
  }
}
