import { faker } from '@faker-js/faker';
import { AxiosRequestConfig } from 'axios';

type Mock = (congfig: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

export const mockSession: Mock = (config) => {
  return [
    200, {
      jwt : faker.random.word()
    }
  ]
}

let id = 0
const createId = () => {
  id += 1
  return id
}

export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26


  const createPager = (page = 1) => ({ page, per_page, count})


  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs
    }))
  
  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n),
    pager: createPager(page)
  })
  
  if ( kind === 'expenses' && (page === 1 || !page)) {
    return [200, createBody(25)]
  } else if( kind === 'expenses' && page === 2){
    return [200, createBody(1)]
  } else {
    return [200, createBody(1)]
  }
}


export const mockItemCreate: Mock = (config) => {
  return [
    200, {
      resources: {
        "id": 2264,
        "user_id": 1312,
        "amount": 9900,
        "note": null,
        "tag_ids": [3508],
        "happen_at": "2020-10-29T16:00:00.000Z",
        "created_at": "2022-07-03T15:35:56.301Z",
        "updated_at": "2022-07-03T15:35:56.301Z",
        "kind": "expenses"
      }
    // return [
    //   422, {
    //     errors: {
    //       tags_id: ["必须选择标签"],
    //       amount: ["金额必须大于0"]
    //     }
    //   }
    // ]
      
    }
  ]
}

export const mockTagShow: Mock = config =>{
  const createTag = (attrs?: any) =>
    ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: 'expenses',
      ...attrs
    })
  return [200, {resource: createTag()}]
}

export const mockTagEdit: Mock = config => {
  const createTag = (attrs?: any) =>
    ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: 'expenses',
      ...attrs
    })
  return [200, {resource: createTag()}]
}

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tag_ids: [createId()],
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind,
      tags: [
        {
          id: 211,
          user_id: 80,
          name: "Eum.",
          sign: "😡",
          deleted_at: null,
          created_at: "2023-01-13T21:50:08.953+08:00",
          updated_at: "2023-01-13T21:50:08.953+08:00",
          kind: "expenses"
        }
      ]
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page),
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  }else{
    return [200, {}]
  }
}

export const mockItemSummary: Mock = (config) => {
  return [200, {
    "groups": [
      { 
        "amount": 100, 
        "tag": {"created_at": "2023-02-01T00:00:00.000+0800"}
      },
      { 
        "tag": {"created_at": "2023-02-12T00:00:00.000+0800",},
        "amount": 300 
      },
      {
        "tag": {"created_at": "2023-02-15T00:00:00.000+0800"},
         "amount": 500 
      },
      {
        "tag": {"created_at": "2023-02-17T00:00:00.000+0800"},
         "amount": 800 
      },
      {
        "tag": {"created_at": "2023-02-27T00:00:00.000+0800"},
         "amount": 200 
      }
    ],
    "total": 600
  }]
}


// export const mockItemSummary: Mock = (config) => {
//   const { group_by, kind } = config.params
//   if( group_by === 'happen_at' && kind === 'expenses') {
//     return [
//       200,
//         {
//           groups: [
//             { happen_at: '2022-07-18T00:00:00.000+0800', amount: 100 },
//             { happen_at: '2022-07-22T00:00:00.000+0800', amount: 300 },
//             { happen_at: '2022-07-29T00:00:00.000+0800', amount: 200 }
//           ],
//           total: 600
//         }
//       ]
//   } else if(group_by === 'happen_at' && kind === 'income'){
//       return [
//         200,
//         {
//           groups: [
//             { happen_at: '2022-07-08T00:00:00.000+0800', amount: 500 },
//             { happen_at: '2022-07-12T00:00:00.000+0800', amount: 400 },
//             { happen_at: '2022-07-19T00:00:00.000+0800', amount: 300 }
//           ],
//           total: 1200
//         }
//       ]
//     }else if(group_by === 'tag_id' && kind === 'expenses') {
//       return [
//         200, 
//         {
//           groups: [
//             { tag_id: 1, tag: { sign: '❤', id: 1, name: '交通' }, amount: 300 },
//             { tag_id: 2, tag: { sign: '👀',  id: 2, name: '吃饭' }, amount: 800 },
//             { tag_id: 3, tag: { sign: '💭',  id: 3, name: '购物' }, amount: 100 }
//           ],
//           tatal: 1200
//         }
//       ]
//     }else {
//       return [
//         200, 
//         {
//           groups: [
//             { tag_id: 1, tag: { sign: '❤', id: 1, name: '交通' }, amount: 2000 },
//             { tag_id: 2, tag: { sign: '👀',  id: 2, name: '吃饭' }, amount: 400 },
//             { tag_id: 3, tag: { sign: '💭',  id: 3, name: '购物' }, amount: 600 }
//           ],
//           total: 3000
//         }
//       ]
//     }
// }