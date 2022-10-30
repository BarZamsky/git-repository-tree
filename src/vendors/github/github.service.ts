import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  getRepoFilesTree() {
    console.log('hello')
  }
}