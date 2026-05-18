import { File } from '../../Workspace/WorkspaceContext'

export interface TreeNode {
  name: string
  path: string
  file?: File
  children: TreeNode[]
}

export const buildTree = (files: File[]): TreeNode[] => {
  const root: TreeNode = { name: '', path: '', children: [] }

  for (const file of files) {
    const segments = file.path.split('/')
    let currentNode = root

    segments.forEach((segment, index) => {
      const isFile = index === segments.length - 1
      let childNode = currentNode.children.find((child) => child.name === segment)

      if (!childNode) {
        childNode = {
          name: segment,
          path: segments.slice(0, index + 1).join('/'),
          children: [],
          ...(isFile ? { file } : {}),
        }
        currentNode.children.push(childNode)
      }

      currentNode = childNode
    })
  }

  // Sort: folders first, then alphabetically
  const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
    return nodes
      .map((node) => ({ ...node, children: sortNodes(node.children) }))
      .sort((a, b) => {
        const aIsFolder = a.children.length > 0 ? 0 : 1
        const bIsFolder = b.children.length > 0 ? 0 : 1
        if (aIsFolder !== bIsFolder) return aIsFolder - bIsFolder
        return a.name.localeCompare(b.name)
      })
  }

  return sortNodes(root.children)
}
