import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";


class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({ user_id, refresh_token, expires_date, }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date
    });

    this.usersTokens.push(userToken);

    return userToken;
  };

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.id === user_id && userToken.refresh_token === refresh_token
    );
    
    return userToken;
  };

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find( userToken => userToken.id === id);

    this.usersTokens.splice(
      this.usersTokens.indexOf(userToken)
    );
  }
  
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      userToken => userToken.refresh_token === refresh_token
    );
    
    return userToken;
  }

}

export { UsersTokensRepositoryInMemory };
