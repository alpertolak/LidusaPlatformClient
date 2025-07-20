import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_User } from 'src/app/contracts/users/create-user';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { ListPaginationUsers } from 'src/app/contracts/users/list-pagination-users';
import { User_Is_Admin } from 'src/app/contracts/users/User-Is-Admin';
import { HttpErrorResponse } from '@angular/common/http';
import { User_Profile_Image } from 'src/app/contracts/users/user-profile-image';
import { User_Document } from 'src/app/contracts/users/user-document';

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

  async getCurrentUserAsync(successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User> {
    const observable: Observable<User> = this.httpService.Get({
      controller: "users",
      action: "get-current-user"
    })
    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }


  async getUserByIdOrUsernameOrEmailAsync(UserIDOrUsernameOrEmail: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User> {
    const observable: Observable<User> = this.httpService.Get({
      controller: "users",
      action: "get-user-by-id-or-username-or-email",
      queryString: `UserIDOrUsernameOrEmail=${UserIDOrUsernameOrEmail}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }

  async getFilteredUsersAsync(username: string, name: string, email: string, phoneNumber: string, roleId: string, suspend: string, page: number, size: number, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<ListPaginationUsers> {
    const observable: Observable<ListPaginationUsers> = this.httpService.Get({
      controller: "users",
      action: "get-filtered-users",
      queryString: `username=${username}&name=${name}&email=${email}&phoneNumber=${phoneNumber}&RoleId=${roleId}&suspend=${suspend}&page=${page}&size=${size}`
    })
    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }
  async assingRoleToUserAsync(UserID: string, roles: string[], successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = this.httpService.Post({
      controller: "users",
      action: "assing-role-to-user"
    }, { UserID, roles })

    //TODO en kolay http hata ayıklama yapısı
    const promisedata = firstValueFrom(observable)
    promisedata.then(successCallback).catch(errorCallback)
  }

  async getRolesToUserAsync(UserID: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<string[]> {

    const observable: Observable<{ userRoles: string[] }> = await this.httpService.Get({
      controller: "users",
      action: "get-roles-to-user",
      queryString: `UserID=${UserID}`
    }, UserID)

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)

    return (await promiseData).userRoles
  }

  async getUserIsAdminAsync(UserIDOrUsernameOrEmail: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User_Is_Admin> {
    const observable: Observable<User_Is_Admin> = await this.httpService.Get({
      controller: "users",
      action: "get-user-is-admin",
    }, UserIDOrUsernameOrEmail)

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

  async getAllUsernames(ExemptID?: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<UsernameResponse> {
    const observable: Observable<UsernameResponse> = this.httpService.Get({
      controller: "users",
      action: "get-all-usernames",
      queryString: `ExemptID=${ExemptID}`//kullanıcının adının kontrol edilebilmesi için verisi kaydedilecek kullanıcının ıd bilgisi api'ye gönderilir
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)

    return await promiseData
  }

  async usernameCheck(userName: string, ExemptID?: string) {
    const names: UsernameResponse = await this.getAllUsernames(ExemptID);
    const lowerCaseNames = names.allUsernames.map(name => name.toLowerCase());
    debugger
    if (lowerCaseNames.includes(userName.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  async createUserAsync(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpService.Post<Create_User | User>({
      controller: "users",
      action: "create-user"
    }, user)
    return await firstValueFrom(observable) as Create_User
  }

  async changePassword(UserID: string, currentPassword: string, newPassword: string, successCallback?: (message: string) => void, errorCallback?: (error: any) => void): Promise<void> {
    const observable: Observable<any> = this.httpService.Post({
      controller: "users",
      action: "password-change"
    }, {
      UserID: UserID,
      CurrentPassword: currentPassword,
      NewPassword: newPassword
    });

    return await firstValueFrom(observable).then(successCallback).catch(errorCallback)
  }

  //GENÇAY DERS.60
  async passwordUpdateAsync(UserID: string, resetToken: string, password: string, passwordConfirm: string, successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = this.httpService.Post({
      controller: "users",
      action: "password-update"
    }, {
      UserID: UserID,
      resetToken: resetToken,
      Password: password,
      PasswordConfirm: passwordConfirm
    });
    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
  }

  async getProfileImages(UserID: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User_Profile_Image[]> {
    const observable: Observable<User_Profile_Image[]> = this.httpService.Get<User_Profile_Image[]>({
      controller: "users",
      action: "Get-User-Profile-Images",
    }, UserID)

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
    return await promiseData
  }
  async getUserDocuments(UserID: string, successCallback?: () => void, errorCallback?: (error: any) => void): Promise<User_Document[]> {
    const observable: Observable<User_Document[]> = this.httpService.Get<User_Document[]>({
      controller: "users",
      action: "GetUserDocuments"
    }, UserID)

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)

    return await promiseData
  }

  async DeleteAllUserDocumentsById(UserID: string, successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = this.httpService.Delete<any>({
      controller: "users",
      action: "DeleteAllUserDocumentsById"
    }, UserID)
    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
  }

  async DeleteUser(UserID: string, successCallback?: () => void, errorCallback?: (error: any) => void) {
    const observable: Observable<any> = this.httpService.Delete<any>({
      controller: "users",
      action: "DeleteUser",
    }, UserID)

    const promiseData = firstValueFrom(observable)
    promiseData.then(successCallback).catch(errorCallback)
  }

}

interface UsernameResponse {
  allUsernames: string[];
}
