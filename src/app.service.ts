import { Injectable } from '@nestjs/common';
import { GithubService } from './vendors/github/github.service';
import { RepoFileTreeResponse } from './vendors/github/types';

@Injectable()
export class AppService {
  constructor(private readonly githubService: GithubService) {}
  async getRepoTree(owner, repoName: string): Promise<RepoFileTreeResponse> {
    return await this.githubService.getRepoFilesTree(owner, repoName);
  }
}
