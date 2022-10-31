import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { GithubService } from './github.service';

describe('Github service tests', () => {
  let httpService = new HttpService();
  let githubService = new GithubService(httpService);
  it('should get repo sha string', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: require('./mocks/repo.json'),
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }),
    );
    const res = await githubService.getTreeSHA('bar', 'repo');
    expect(res).toEqual('0cb92d5ce4044fc643bf6478d02d62cacfa1f2f9');
  });
  // it('should create repo file tree', async () => {
  //   mockGet.mockImplementation((url) => {
  //     if (url === 'https://api.github.com/repos/bar/repo/branches/master') {
  //       return {
  //         data: require('./mocks/repo.json'),
  //       };
  //     } else {
  //       return {
  //         data: require('./mocks/tree.json'),
  //       };
  //     }
  //   });
  //   const res = await githubService.getRepoFilesTree('bar', 'repo');
  //   expect(res).toEqual(require('./mocks/response.json'));
  // });
});
