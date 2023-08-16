'use client'

import { useCallback, useMemo, useState } from 'react'
import type { Connection, Edge, EdgeChange, Node as FlowNode, NodeChange } from 'reactflow'
import ReactFlow, { Controls, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import type { Node } from './node'
import NotionNode from '@/components/NotionNode'

// const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }]

function Flow({ pages }: { pages: Node[] }) {
  const nodeTypes = useMemo(() => ({ notionNode: NotionNode }), [])
  const initialNodes = pages.map((page, index) => ({
    id: page.id,
    type: 'notionNode',
    position: { x: index * 346 + 80, y: -100 },
    data: page,
  }))

  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>([])

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes(nds => applyNodeChanges(changes, nds))
  }, [])
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges(eds => applyEdgeChanges(changes, eds))
  }, [])
  const onConnect = useCallback((params: Connection) => {
    setEdges(eds => addEdge(params, eds))
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Flow
