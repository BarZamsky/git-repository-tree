import { BadRequestException, Injectable } from '@nestjs/common';
import { GithubService } from './vendors/github/github.service';
import { RepoFileTreeResponse } from './vendors/github/types';

@Injectable()
export class AppService {
  constructor( private readonly githubService : GithubService) {}
  async getRepoTree(owner, repoName: string): Promise<RepoFileTreeResponse> {
    if (!owner) {
      throw new BadRequestException('owner is a mandatory parameter')
    }
    if (!repoName) {
      throw new BadRequestException('repoName is a mandatory parameter')
    }
    return await this.githubService.getRepoFilesTree(owner, repoName)
  }
}
