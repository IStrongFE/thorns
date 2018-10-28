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
  // 1.pid为undefined
  // 2.pid为0 -不考虑
  // 3.pid有值，但找不到的情况
  let cachePid, cacheId 
  array.forEach(node => {
    let _id = node[idProp]
    let _pid = node[pidProp]
    let _node = Object.assign({}, node, { _id, _pid })
    let cacheRow = cachePid[_pid]

    // undefined also can as a key
    if (cacheRow) {
      cacheRow.push(_node)
    } else {
      cachePid[_pid] = [ _node ]
    }
    // so the id must unique
    cacheId[_id] = node
  })
  const create = function (pid, level = 0) {
    let result = []

    if (pid) {
      console.log(1)
    } else {
      // undefined 或者 找不到父节点的情况
      result = cachePid[undefined]
      nodes.forEach(node => {
        if (!cacheId[node._pid]) {
          node[levelProp] = level
          result.push(node)
        }
      })
    }

    // 递归
    result.forEach(node => {
      node[childProp] = create(pid, ++level)
    })
  }
  return create(array)
}

export default flat2tree
