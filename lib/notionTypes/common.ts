export interface BaseNotionObject {
  object: 'page' | 'database' | 'block'
  id: string
  created_time: string
  last_edited_time: string
  created_by: created_by
  last_edited_by: last_edited_by
  parent: parent
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

export interface created_by {
  object: string
  id: string
}

export interface last_edited_by {
  object: string
  id: string
}

export interface parent {
  type: string
  database_id: string
}

export interface Date {
  id: string
  type: string
  date?: any // todo
}

export interface Status {
  id: string
  type: string
  status: {
    id: string
    name: string
    color: string
  }
}

export interface Assign {
  id: string
  type: string
  people: any[] // todo
}

