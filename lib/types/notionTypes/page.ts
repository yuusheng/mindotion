import type { BaseNotionObject, Icon } from './common'

export interface NotionPageResponse extends BaseNotionObject {
  cover?: any
  icon: Icon
  properties: DatabaseChildPageProperties & BlockChildPageProperties
}

interface DatabaseChildPageProperties {
  Name?: Title
  Date?: Date
  Status?: Status
  Assign?: Assign
}

interface BlockChildPageProperties {
  title?: Title
}

interface Title {
  id: string
  type: string
  title: TitleContent[]
}

interface TitleContent {
  type: string
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

interface Date {
  id: string
  type: string
  date?: any // todo
}

interface Status {
  id: string
  type: string
  status: {
    id: string
    name: string
    color: string
  }
}

interface Assign {
  id: string
  type: string
  people: any[] // todo
}
