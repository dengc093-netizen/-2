
export enum View {
  HOME = 'home',
  DETAIL = 'detail',
  FORM = 'form',
  PROFILE = 'profile',
  MESSAGES = 'messages',
  FAVORITES = 'favorites'
}

export enum Gender {
  MALE = '公',
  FEMALE = '妹妹',
  NEUTERED_MALE = '弟弟'
}

export type PetCategory = '狗狗' | '猫猫' | '小鸟' | '小动物';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: Gender;
  distance: string;
  imageUrl: string;
  category: PetCategory;
  weight?: string;
  color?: string;
  size?: string;
  traits?: string[];
  description?: string;
  isNew?: boolean;
  isFavorite?: boolean;
  status?: '待领养' | '审核中' | '已通过';
}

export interface Application {
  id: string;
  petId: string;
  petName: string;
  petBreed: string;
  petAge: string;
  petImageUrl: string;
  status: '审核中' | '已通过';
  progress: number;
}

export interface ChatSession {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isShelter: boolean;
}
