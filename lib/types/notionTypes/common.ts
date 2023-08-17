export interface BaseNotionObject {
  object: 'page' | 'database' | 'block'
  id: string
  created_time: string
  last_edited_time: string
  parent: ParentAsUnion
  archived: boolean
  url: string
  public_url?: any
}

export type Icon = {
  type: 'external'
  external: {
    url: string
  }
} | {
  type: 'emoji'
  emoji: string
} | {
  type: 'file'
  file: {
    url: string
    expiry_time: string
  }
}

type ParentType = 'database_id' | 'block_id'
type Parent<U extends ParentType & string> = { type: U } & { [P in U]: string }
export type DistributeToParent<U extends ParentType & string> = U extends string
  ? Parent<U>
  : never

export type ParentAsUnion = DistributeToParent<ParentType>
