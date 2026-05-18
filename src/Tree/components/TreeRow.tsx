import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useWorkspaceContext } from '../../Workspace/WorkspaceContext'
import { TreeNode } from '../utils/tree'

interface TreeRowProps {
  node: TreeNode
  depth: number
}

export const TreeRow: React.FC<TreeRowProps> = ({ node, depth }) => {
  const { activeFile, activateFile } = useWorkspaceContext()
  const isFolder = node.children.length > 0
  const [isExpanded, setIsExpanded] = useState(true)

  const handleClick = () => {
    if (isFolder) {
      setIsExpanded((prev) => !prev)
    } else if (node.file) {
      activateFile(node.file.path)
    }
  }

  return (
    <>
      <Box
        display="flex"
        height="1.5rem"
        flexDirection="row"
        alignItems="center"
        pl={1 + depth * 1.5}
        pr={1}
        sx={{
          cursor: 'default',
          background: activeFile?.path === node.file?.path ? '#DADADA' : 'inherit',
          '&:hover': { background: '#E6E6E6' },
        }}
        onClick={handleClick}
      >
        <Typography variant="body2" sx={{ userSelect: 'none' }}>
          {isFolder ? (isExpanded ? '📂 ' : '📁 ') : '📄 '}
          {node.name}
        </Typography>
      </Box>
      {isFolder && isExpanded &&
        node.children.map((child) => (
          <TreeRow key={child.path} node={child} depth={depth + 1} />
        ))
      }
    </>
  )
}
