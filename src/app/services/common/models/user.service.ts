import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from 'src/app/contracts/users/create-user';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { ListPaginationUsers } from 'src/app/contracts/users/list-pagination-users';
import { User_Is_Admin } from 'src/app/contracts/users/User-Is-Admin';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpClientService,
  ) { }


  async UpdateUserAsync(user: User, successCallback?: () => void, errorCallback?: (errorMessage: string | undefined) => void) {
    const observable: Observable<any> = this.httpService.Put({
      controller: "users",
      action: "update-user"
    }, user)

    //TODO validation hata mesajlarını işle
    await firstValueFrom(observable).then(successCallback).catch((errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error
      let message = ""
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}\n`
        });
      });
      if (errorCallback) errorCallback(message)
    })
  }

  async getUserByIdOrUsernameOrEmailAsync(UserIdOrUsernameOrEmail: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User> {
    const observable: Observable<User> = this.httpService.Get({
      controller: "users",
      action: "get-user-by-id-or-username-or-email",
      queryString: `UserIdOrUsernameOrEmail=${UserIdOrUsernameOrEmail}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }

  async getFilteredUsersAsync(username: string, name: string, email: string, phoneNumber: string, roleId: string, page: number, size: number, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<ListPaginationUsers> {
    const observable: Observable<ListPaginationUsers> = this.httpService.Get({
      controller: "users",
      action: "get-filtered-users",
      queryString: `username=${username}&name=${name}&email=${email}&phoneNumber=${phoneNumber}&RoleId=${roleId}&page=${page}&size=${size}`
    })
    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }
  async assingRoleToUserAsync(userId: string, roles: string[], successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = this.httpService.Post({
      controller: "users",
      action: "assing-role-to-user"
    }, { userId, roles })

    //TODO en kolay http hata ayıklama yapısı
    const promisedata = firstValueFrom(observable)
    promisedata.then(successCallback).catch(errorCallback)
  }

  async getRolesToUserAsync(userId: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<string[]> {

    const observable: Observable<{ userRoles: string[] }> = await this.httpService.Get({
      controller: "users",
      action: "get-roles-to-user",
      queryString: `UserId=${userId}`
    }, userId)

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)

    return (await promiseData).userRoles
  }

  async getUserIsAdminAsync(UserIdOrUsernameOrEmail: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User_Is_Admin> {
    const observable: Observable<User_Is_Admin> = await this.httpService.Get({
      controller: "users",
      action: "get-user-is-admin",
    }, UserIdOrUsernameOrEmail)

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }

  async getAllUsersAsync(page: number, size: number, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<ListPaginationUsers> {
    const observable: Observable<ListPaginationUsers> = this.httpService.Get({
      controller: "users",
      action: "get-all-users",
      queryString: `page=${page}&size=${size}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)

    return await promiseData
  }

  async createUserAsync(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpService.Post<Create_User | User>({
      controller: "users",
      action: "create-user"
    }, user)
    return await firstValueFrom(observable) as Create_User
  }

  async changePassword(userid: string, currentPassword: string, newPassword: string, successCallback?: (message: string) => void, errorCallback?: (error: any) => void): Promise<void> {
    const observable: Observable<any> = this.httpService.Post({
      controller: "users",
      action: "password-change"
    }, {
      userid: userid,
      CurrentPassword: currentPassword,
      NewPassword: newPassword
    });

    return await firstValueFrom(observable).then(successCallback).catch(errorCallback)
  }

  //GENÇAY DERS.60
  async passwordUpdateAsync(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallback?: () => void, errorCallback?: (error: any) => void) {
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
      await firstValueFrom(observable);
      if (successCallback) successCallback();

    } catch (error) {
      if (errorCallback) errorCallback(error);
    }
  }
}
