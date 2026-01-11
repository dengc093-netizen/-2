"""
初始化示例数据 - 对应前端 constants.tsx 中的 MOCK 数据
运行: python manage.py shell < init_data.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'petpals.settings')
django.setup()

from api.models import Pet, Shelter, User, ChatSession, Message, Application

# 创建超级管理员 (如果不存在)
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print("超级管理员账号创建成功: admin / admin123")
else:
    print("超级管理员账号已存在")

# 清理现有数据
Pet.objects.all().delete()
Shelter.objects.all().delete()

# 创建宠物数据
pets_data = [
    {
        'name': '贝拉 (Bella)',
        'breed': '黄金猎犬',
        'age': '2岁',
        'gender': '妹妹',
        'category': '狗狗',
        'distance': '1.2 公里',
        'image_url': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAphARXDO49uNh8vV7xvU4QB9imxpQKPqPgJ6d1N0NRnQ1rfGkTs-zwfe4U98W8DfJk3YC_S3GQ24lB4fcVokKKqfcUptDrxqT1LHiGa-G4lv38rWWtM-Hque88rY8uPsgesZpJoIvCUFZ9bwb9rG4r9RzxEovyseT27eHX5r9Sj6LJraQBgSpira0uB8hg0Zl_pNDfskADmYwr_jiKRbt-LjeglIDLW1XuDUgWXcZ8pyE2ocoBZAzmj3UNrIDjYs2icyGJhDMNMZks',
        'is_new': True,
        'weight': '25 公斤',
        'color': '金黄色',
        'size': '大型犬',
        'traits': ['性格: 友善', '活泼', '已接种疫苗'],
        'description': '贝拉是一个非常温柔和聪明的金毛，它特别喜欢和人互动，是非常棒的家庭伴侣。'
    },
    {
        'name': '库珀 (Cooper)',
        'breed': '马耳他犬',
        'age': '4个月',
        'gender': '弟弟',
        'category': '狗狗',
        'distance': '5.0 公里',
        'image_url': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL9awFpVyS8oX8piCh1kZoErdnMiLMbrZxhFCj-BnIbacJbyoDYx2rEwNdHlHiKRTMikkwJnfMcbCMOvZIInGvD3EQ2wtQ75MXxs8f-n8CidGIDzaGuNvRWp-wCQ9UstdaRivJ72n00I3IHbm2tCOeKERVNr0JWRaJn67_LzsMDajNwTVOI4ckBqvUapqNU1Pci6l13LsWMI6ViWBjiljn0QTtKNoC4Mx42FNICNL-iFQ7IR6JdtE5inLgc1SwZyu7oa2b2Fzh17iR',
        'weight': '3 公斤',
        'color': '纯白色',
        'size': '小型犬',
        'traits': ['聪明', '温顺', '已驱虫'],
        'description': '库珀还是个宝宝，正在寻找一个有耐心的家庭带它一起成长。'
    },
    {
        'name': '露娜 (Luna)',
        'breed': '狸花猫',
        'age': '1岁',
        'gender': '妹妹',
        'category': '猫猫',
        'distance': '0.8 公里',
        'image_url': 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3cYJlosyB0sj23AYTwEIeunKrRlQlA4D8YcAOMF0L2B-SgWMQB9JAUy8peik_nhgyOfIU7-fteuI8-ytIlxGPtuU-DmPJ29QwQgYofv-p0EVJ-_hR-T6-tgYHhHuAijbzfgZZc4C1eVrA9sdNn2mBhznHGVup4fNKr_fEBxWXjta5d-o9OSwV7yDqSHHOsXV1lnRr0nloVPlTmem71S0jqd7T-1rbhOZ6HuyM6ick6wTstY9y5hAWybOVMFZbjPjB8ukAa_X5dPnZ',
        'weight': '4 公斤',
        'color': '棕黑条纹',
        'size': '中型',
        'traits': ['安静', '独立', '已绝育'],
        'description': '露娜是一只非常优雅的狸花猫，喜欢在窗边晒太阳。'
    },
    {
        'name': '马克思 (Max)',
        'breed': '柯基犬',
        'age': '3岁',
        'gender': '弟弟',
        'category': '狗狗',
        'distance': '2.5 公里',
        'image_url': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9NXMQd9Y7i_feHrq-nEsTsRnzxiJUgCIp0p6ycoxMoOan18Ny-H1p1fvfRYGFDHRoqKyNnoK9Nr4N3IbU03Y_6gccpDzPj97-xyT8pfs5UTLYn-fViSbuchA4o2lk8PfzREdRUNDzuoD6ne_i_i93ttNdxO4_g-sVpMm2c9jVdEnWRLxKuK8Gm969LsL5sKy3X8ELXCbpUF9kSPBCT2hka_-r603-nyWVdIHb06WumYQzZ2Aulm-pianSKu-kizJFp8k-H7LCuJrF',
        'weight': '12 公斤',
        'color': '黄白色',
        'size': '小型犬',
        'traits': ['运动能手', '吃货', '已接种疫苗'],
        'description': '马克思非常活泼，腿虽短但跑得飞快，最喜欢玩接球游戏。'
    },
]

for pet_data in pets_data:
    Pet.objects.create(**pet_data)

print(f"创建了 {Pet.objects.count()} 只宠物")

# 创建救助机构
shelters_data = [
    {
        'name': '阳光爪爪救助中心',
        'avatar': 'https://picsum.photos/id/64/100/100',
        'description': '专注于流浪猫狗救助',
        'address': '上海市静安区某路123号',
        'phone': '021-12345678',
        'is_verified': True,
    },
    {
        'name': '喵星人中转站',
        'avatar': 'https://picsum.photos/id/66/100/100',
        'description': '猫咪专业救助与领养',
        'address': '上海市浦东新区某街456号',
        'phone': '021-87654321',
        'is_verified': True,
    },
]

for shelter_data in shelters_data:
    Shelter.objects.create(**shelter_data)

print(f"创建了 {Shelter.objects.count()} 个救助机构")
print("初始化数据完成！")
