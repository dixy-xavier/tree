import React, { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { TreeRow } from './components/TreeRow'
import { useWorkspaceContext } from '../Workspace/WorkspaceContext'
import { buildTree } from './utils/tree'

export const Tree = () => {
  const { files } = useWorkspaceContext()
  const treeNodes = useMemo(() => buildTree(files), [files])

  return (
    <Box>
      <Box p={1}>
        <Typography variant="h6">Tree</Typography>
      </Box>
      <Box>
        {treeNodes.map((node) => (
          <TreeRow key={node.path} node={node} depth={0} />
        ))}
      </Box>
    </Box>
  )
}
