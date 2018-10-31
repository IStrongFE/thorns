/**
 * transform a flat array with set membership to a tree structure
 *
 * @param {Array} array the array to transform
 * @param {String} idProp the property name of node
 * @param {String} pidProp the property name of node
 * @param {String} childProp the child property name of node
 * @returns {Array} a tree structure data
 */
function flat2tree (
  array = [],
  idProp = 'id',
  pidProp = 'pid',
  childProp = 'children',
  levelProp = 'level'
) {
  let cachePid = {}, cacheId = {}, nodes = []
  array.forEach(node => {
    let _id = node[idProp]
    let _pid = node[pidProp]
    let _node = Object.assign({}, node, { _id, _pid })
    let cacheRow = cachePid[_pid]

    // undefined also can as a string key
    if (cacheRow) {
      cacheRow.push(_node)
    } else {
      cachePid[_pid] = [_node]
    }
    // so the id must unique
    cacheId[_id] = _node
    nodes.push(_node)
  })

  const create = function (pid, level = 0) {
    let result = []

    if (pid !== undefined) {
      result = cachePid[pid] || []
    } else {
      // undefined or no parent as root
      let nodesUndefined = cachePid[undefined] || []
      let nodesNoParent = nodes.filter(node => !cacheId[node._pid])
      result = result.concat(nodesUndefined).concat(nodesNoParent)
    }
    // recursion
    level++
    result.forEach(node => {
      node[levelProp] = level
      node[childProp] = create(node._id, level)
    })

    // return a [] or null ?
    return result
  }

  return create()
}

export default flat2tree
