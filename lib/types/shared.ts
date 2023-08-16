export interface MindotionNode {
  id: string
  title: string
  icon: string | null
  children?: MindotionNode[] | null
  subNode?: MindotionNode[] | null
  overNode?: MindotionNode | null
}
