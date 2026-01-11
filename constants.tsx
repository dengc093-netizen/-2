
import { Pet, Gender, Application, ChatSession } from './types';

export const MOCK_PETS: Pet[] = [
  {
    id: '1',
    name: '贝拉 (Bella)',
    breed: '黄金猎犬',
    age: '2岁',
    gender: Gender.FEMALE,
    distance: '1.2 公里',
    category: '狗狗',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAphARXDO49uNh8vV7xvU4QB9imxpQKPqPgJ6d1N0NRnQ1rfGkTs-zwfe4U98W8DfJk3YC_S3GQ24lB4fcVokKKqfcUptDrxqT1LHiGa-G4lv38rWWtM-Hque88rY8uPsgesZpJoIvCUFZ9bwb9rG4r9RzxEovyseT27eHX5r9Sj6LJraQBgSpira0uB8hg0Zl_pNDfskADmYwr_jiKRbt-LjeglIDLW1XuDUgWXcZ8pyE2ocoBZAzmj3UNrIDjYs2icyGJhDMNMZks',
    isNew: true,
    isFavorite: true,
    weight: '25 公斤',
    color: '金黄色',
    size: '大型犬',
    traits: ['性格: 友善', '活泼', '已接种疫苗'],
    description: '贝拉是一个非常温柔和聪明的金毛，它特别喜欢和人互动，是非常棒的家庭伴侣。'
  },
  {
    id: '2',
    name: '库珀 (Cooper)',
    breed: '马耳他犬',
    age: '4个月',
    gender: Gender.NEUTERED_MALE,
    distance: '5.0 公里',
    category: '狗狗',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL9awFpVyS8oX8piCh1kZoErdnMiLMbrZxhFCj-BnIbacJbyoDYx2rEwNdHlHiKRTMikkwJnfMcbCMOvZIInGvD3EQ2wtQ75MXxs8f-n8CidGIDzaGuNvRWp-wCQ9UstdaRivJ72n00I3IHbm2tCOeKERVNr0JWRaJn67_LzsMDajNwTVOI4ckBqvUapqNU1Pci6l13LsWMI6ViWBjiljn0QTtKNoC4Mx42FNICNL-iFQ7IR6JdtE5inLgc1SwZyu7oa2b2Fzh17iR',
    weight: '3 公斤',
    color: '纯白色',
    size: '小型犬',
    traits: ['聪明', '温顺', '已驱虫'],
    description: '库珀还是个宝宝，正在寻找一个有耐心的家庭带它一起成长。'
  },
  {
    id: '3',
    name: '露娜 (Luna)',
    breed: '狸花猫',
    age: '1岁',
    gender: Gender.FEMALE,
    distance: '0.8 公里',
    category: '猫猫',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3cYJlosyB0sj23AYTwEIeunKrRlQlA4D8YcAOMF0L2B-SgWMQB9JAUy8peik_nhgyOfIU7-fteuI8-ytIlxGPtuU-DmPJ29QwQgYofv-p0EVJ-_hR-T6-tgYHhHuAijbzfgZZc4C1eVrA9sdNn2mBhznHGVup4fNKr_fEBxWXjta5d-o9OSwV7yDqSHHOsXV1lnRr0nloVPlTmem71S0jqd7T-1rbhOZ6HuyM6ick6wTstY9y5hAWybOVMFZbjPjB8ukAa_X5dPnZ',
    isFavorite: true,
    weight: '4 公斤',
    color: '棕黑条纹',
    size: '中型',
    traits: ['安静', '独立', '已绝育'],
    description: '露娜是一只非常优雅的狸花猫，喜欢在窗边晒太阳。'
  },
  {
    id: '4',
    name: '马克思 (Max)',
    breed: '柯基犬',
    age: '3岁',
    gender: Gender.NEUTERED_MALE,
    distance: '2.5 公里',
    category: '狗狗',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9NXMQd9Y7i_feHrq-nEsTsRnzxiJUgCIp0p6ycoxMoOan18Ny-H1p1fvfRYGFDHRoqKyNnoK9Nr4N3IbU03Y_6gccpDzPj97-xyT8pfs5UTLYn-fViSbuchA4o2lk8PfzREdRUNDzuoD6ne_i_i93ttNdxO4_g-sVpMm2c9jVdEnWRLxKuK8Gm969LsL5sKy3X8ELXCbpUF9kSPBCT2hka_-r603-nyWVdIHb06WumYQzZ2Aulm-pianSKu-kizJFp8k-H7LCuJrF',
    isFavorite: true,
    weight: '12 公斤',
    color: '黄白色',
    size: '小型犬',
    traits: ['运动能手', '吃货', '已接种疫苗'],
    description: '马克思非常活泼，腿虽短但跑得飞快，最喜欢玩接球游戏。'
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    petId: '1',
    petName: 'Bella',
    petBreed: '金毛寻回犬',
    petAge: '3个月',
    petImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0TRyp-72aILErRyANNdhIDYyYdTWzcSqd0-Mig3QgAD25UIEVxKDNBqdFYb8Mz5a7Ta_GFfFCJd1IHLrx9iq2C-ZZdjwW4v-FH2N4h-lT_F19O_7T1fnQGyhN0WXj-FEjdPOc93fCJ3-bA0tADKD73-ylxm33EMPkek_v0ZYoPuntSP7hvTfDOPlf_HUmEE494qXUuhGcqIGp8AvCTMLbktuCynVP8xOzMACP3KRiC4TBg7jyvrGHp2zMXz-4evEjMx8_ojdGBHOE',
    status: '审核中',
    progress: 66
  },
  {
    id: 'app-2',
    petId: '5',
    petName: 'Milo',
    petBreed: '狸花猫',
    petAge: '1岁',
    petImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN76cfNXv7nMSZpkrLsMnb9Fzomdf7WRe2zsUzs3qjMn7T4JIr329yWHvEF8pfEGv60C0tvNp55Uo2lxk-bwv_jGMW1oYIp4pS9KWVSxuUOl_4-kTd-apgkQJhRjxSahoscXd9hGzSKxRlnT1zYmkTCa13-nKxYKWbGJFEeZr3xr9WyHkG7QX_1_XO_sYvNiMTXu6b2ydZe89R31gVWfEVfzNdGAm03PAI65j7ptXLKnN4o5nGna0QRKLWIdTkj1L8qEJuIomiFP6u',
    status: '已通过',
    progress: 100
  }
];

export const MOCK_CHATS: ChatSession[] = [
  {
    id: 'chat-1',
    name: '阳光爪爪救助中心',
    avatar: 'https://picsum.photos/id/64/100/100',
    lastMessage: '您的领养申请已进入二审阶段，请保持电话畅通。',
    time: '14:20',
    unreadCount: 2,
    isShelter: true
  },
  {
    id: 'chat-2',
    name: '志愿者 - 陈木木',
    avatar: 'https://picsum.photos/id/65/100/100',
    lastMessage: '贝拉平时比较活泼，建议每天带它运动一小时。',
    time: '昨天',
    unreadCount: 0,
    isShelter: false
  },
  {
    id: 'chat-3',
    name: '喵星人中转站',
    avatar: 'https://picsum.photos/id/66/100/100',
    lastMessage: '露娜已经完成绝育手术了，恢复得很好。',
    time: '周一',
    unreadCount: 0,
    isShelter: true
  }
];
