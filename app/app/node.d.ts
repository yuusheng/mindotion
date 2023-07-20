export interface Node {
  id: string
  title: string
  icon: string
  children?: Node[] | null
  subNode?: Node[] | null
  overNode?: Node | null
}
