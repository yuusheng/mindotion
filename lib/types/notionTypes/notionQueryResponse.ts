import type { Assign, BaseNotionObject, Date, Icon, Status } from './common'

export interface NotionQueryResponse extends BaseNotionObject {
  cover?: any
  icon: Icon
  properties: {
    Name: {
      id: string
      type: string
      title: Title[]
    }
    Date?: Date
    Status?: Status
    Assign?: Assign
    title: {
      id: string
      type: string
      title: Title[]
    }
  }
}

export interface Title {
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
