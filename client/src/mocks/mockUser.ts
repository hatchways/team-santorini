import { User } from '../interface/User';

const mockLoggedInUser: User = {
  id: '12345',
  email: 'mockLoggedInUser@gmail.com',
  profilePicture: 'https://robohash.org/mockLoggedInUser@gmail.com.png',
};

const mockOtherUser1: User = {
  id: 'qwert',
  email: 'mockTestUser1@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser1@gmail.com.png',
};

const mockOtherUser2: User = {
  id: 'asdfg',
  email: 'mockTestUser2@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser2@gmail.com.png',
};

const mockOtherUser3: User = {
  id: 'zxcvb',
  email: 'mockTestUser3@gmail.com',
  profilePicture: 'https://robohash.org/mockTestUser3@gmail.com.png',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
