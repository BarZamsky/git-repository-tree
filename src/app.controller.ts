import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { RepoFileTreeResponse } from './vendors/github/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/github/:owner/:repoName/tree')
  async getRepoTree(
    @Param('owner') owner: string,
    @Param('repoName') repoName: string,
  ): Promise<RepoFileTreeResponse> {
    if (!owner) {
      throw new BadRequestException('owner is a mandatory parameter');
    }
    if (!repoName) {
      throw new BadRequestException('repoName is a mandatory parameter');
    }
    return await this.appService.getRepoTree(owner, repoName);
  }
}
