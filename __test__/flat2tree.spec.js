import flat2tree from '../flat2tree'
import areas from '../__data__/areas'
import fs from 'fs'
import path from 'path'

const simpleFlatData = [{
  id: 1,
  pid: 0
}, {
  id: 2,
  pid: 0
}, {
  id: 3,
  pid: 0
}, {
  id: 4,
  pid: 1
}]

const simpleTreeData = [
  {
    "id": 1,
    "pid": 0,
    "_id": 1,
    "_pid": 0,
    "level": 1,
    "children": [
      {
        "id": 4,
        "pid": 1,
        "_id": 4,
        "_pid": 1,
        "level": 2,
        "children": []
      }
    ]
  },
  {
    "id": 2,
    "pid": 0,
    "_id": 2,
    "_pid": 0,
    "level": 1,
    "children": []
  },
  {
    "id": 3,
    "pid": 0,
    "_id": 3,
    "_pid": 0,
    "level": 1,
    "children": []
  }
]

const areasData = areas.map(area => {
  let pid
  let id = area.adcd || ''
  let length = id.length
  if ([15, 12, 9].indexOf(length) !== -1) {
    pid = id.substring(0, length - 3)
  } else if (length === 6 && id.substring(4, 6) !== '00') {
    pid = id.substring(0, 4) + '00'
  } else if (length === 6 && id.substring(2, 6) !== '0000') {
    pid = id.substring(0, 2) + '0000'
  } else {
    pid = 0
  }

  return Object.assign(area, { id, pid })
})

test('it change flat data to tree data', () => {
  let result = flat2tree(simpleFlatData)
  expect(JSON.stringify(result)).toBe(JSON.stringify(simpleTreeData))
})

test('change big data to tree data', () => {
  // 抽查
  console.log(areasData[Math.floor(Math.random() * areasData.length)])
  console.time('performance')
  let result = flat2tree(areasData)
  console.timeEnd('performance')
  let file = path.resolve('./__data__/areasTree.json')
  fs.writeFileSync(file, JSON.stringify(result, null, 2), 'utf-8')
  console.log(result[Math.floor(Math.random() * result.length)])
})

