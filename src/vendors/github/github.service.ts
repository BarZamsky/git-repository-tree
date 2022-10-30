import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { FileObject, GithubFileModel, RepoFileTreeResponse } from './types';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async getRepoFilesTree(
    owner,
    repoName: string,
  ): Promise<RepoFileTreeResponse> {
    const repoSha = await this.getTreeSHA(owner, repoName);
    const request = this.getRepoFilesRequest(owner, repoName, repoSha);
    const data = await lastValueFrom(request);
    return this.iterateFileTree(owner, repoName, data.tree);
  }

  async getTreeSHA(owner, repoName: string): Promise<string> {
    const request = this.httpService
      .get(
        `${process.env.GITHUB_API_URL}/repos/${owner}/${repoName}/branches/master`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          },
        },
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new Error(err);
        }),
      );

    const data = await lastValueFrom(request);
    return data.commit.sha;
  }

  private async iterateFileTree(
    owner,
    repoName: string,
    tree: GithubFileModel[],
  ): Promise<RepoFileTreeResponse> {
    let repoFileTree: RepoFileTreeResponse = {
      owner,
      repositoryName: repoName,
      tree: [],
    };

    const promises = tree.map(async (element) => {
      await this.buildTreeItem(owner, repoName, repoFileTree.tree, element);
    });
    await Promise.all(promises);
    return repoFileTree;
  }

  private async buildTreeItem(
    owner,
    repoName: string,
    tree: FileObject[],
    item: GithubFileModel,
  ) {
    return new Promise(async (resolve) => {
      if (item.type !== 'tree') {
        tree.push({ file: item, isDir: false });
        resolve(tree);
      } else {
        return new Promise(async () => {
          const element = {
            file: item,
            isDir: true,
            tree: [],
          };
          tree.push(element);
          const request = this.getRepoFilesRequest(owner, repoName, item.sha);
          const data = await lastValueFrom(request);
          const promises = data.tree.map(async (item) => {
            await this.buildTreeItem(owner, repoName, element.tree, item);
          });
          resolve(await Promise.all(promises));
        });
      }
    });
  }

  private getRepoFilesRequest(owner, repoName, sha: string) {
    return this.httpService
      .get(
        `${process.env.GITHUB_API_URL}/repos/${owner}/${repoName}/git/trees/${sha}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
          },
        },
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((err) => {
          throw new Error(err);
        }),
      );
  }
}
