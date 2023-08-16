import type { BaseNotionObject } from './common'

export type NotionBlockResponse = BaseNotionObject & {
  has_children: boolean
  archived: boolean
} & NotionBlockType

type NotionBlockType<T extends NotionBlockTypeName = NotionBlockTypeName> = {
  [key in T]: NotionBaseBlockType[T]
} & {
  type: T
}

interface RichText {
  type: 'text'
  text: {
    content: string
    link?: any
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href?: any
}

interface NotionBaseBlockType {
  paragraph: {
    rich_text: RichText[]
    color: string
  }
  heading_1: {
    rich_text: RichText
    is_toggleable: boolean
    color: string
  }
  child_page: {
    title: string
  }
}

type NotionBlockTypeName = keyof NotionBaseBlockType
