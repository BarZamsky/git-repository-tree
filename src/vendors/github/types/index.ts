import { Type } from "@nestjs/common"

type GithubTreeResponse = {
  sha: string
  url: string
  tree: GithubFileModel[]
  truncated: boolean
}

export type GithubFileModel = {
  path: string
  mode: string
  type: string
  sha: string
  size: number
  url: string
}

export type FileObject = {
  file: GithubFileModel
  isDir: boolean
  tree?: FileObject[]
}

export type RepoFileTreeResponse = {
  owner: string
  repositoryName: string
  tree: FileObject[]
}