import { 
  User, PostWithAuthor, ChatWithLastMessage, 
  UserWithStats, Message, Friendship 
} from "@shared/schema";

export class MockService {
  private static instance: MockService;
  
  private constructor() {}
  
  static getInstance(): MockService {
    if (!MockService.instance) {
      MockService.instance = new MockService();
    }
    return MockService.instance;
  }
  
  getMockUser(): User {
    return {
      id: 1,
      username: "somchai_dev",
      password: "mock-password",
      displayName: "คุณสมชาย",
      bio: "นักพัฒนาแอป | รักการท่องเที่ยว | กรุงเทพฯ",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120",
      isOnline: true,
      lastSeen: new Date(),
      createdAt: new Date(),
    };
  }
  
  getMockUserWithStats(): UserWithStats {
    return {
      ...this.getMockUser(),
      postsCount: 47,
      friendsCount: 156,
      likesCount: 892,
    };
  }
  
  getMockUsers(): User[] {
    return [
      {
        id: 2,
        username: "nong_mim",
        password: "mock-password",
        displayName: "น้องมิ้ม",
        bio: "รักการทำอาหาร 🍜",
        avatar: "https://pixabay.com/get/ge0ead83d3af6cabd7d9d719a8465364618398d06ac5f161adb8cc710392bbcd453774f5758c7e1a087ff6a8e0c3082454ab518ad46a2b04cb1391a7987f80664_1280.jpg",
        isOnline: true,
        lastSeen: new Date(),
        createdAt: new Date(),
      },
      {
        id: 3,
        username: "phi_pae",
        password: "mock-password",
        displayName: "พี่เป้",
        bio: "นักธุรกิจ",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        isOnline: false,
        lastSeen: new Date(Date.now() - 30 * 60 * 1000),
        createdAt: new Date(),
      },
      {
        id: 4,
        username: "nong_nat",
        password: "mock-password",
        displayName: "น้องนัท",
        bio: "รักทะเล ☀️",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        isOnline: true,
        lastSeen: new Date(),
        createdAt: new Date(),
      }
    ];
  }
  
  getMockPosts(): PostWithAuthor[] {
    const users = this.getMockUsers();
    return [
      {
        id: 1,
        authorId: 4,
        content: "วันนี้ไปทะเลกับเพื่อนๆ สนุกมากกก 🌊🏖️ อากาศดีมากๆ น้ำใสสุดๆ #beachday #friends #thailand",
        imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        likesCount: 42,
        commentsCount: 8,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        author: users.find(u => u.id === 4)!,
        isLiked: false,
        isSaved: false,
      },
      {
        id: 2,
        authorId: 2,
        content: "เจอร้านอาหารใหม่ที่ถนนข้าวสาร อร่อยมากกกก แนะนำเลย! 🍜😋 #foodie #bangkok #streetfood",
        imageUrl: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        likesCount: 128,
        commentsCount: 23,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        author: users.find(u => u.id === 2)!,
        isLiked: true,
        isSaved: true,
      }
    ];
  }
  
  getMockChats(): ChatWithLastMessage[] {
    const users = this.getMockUsers();
    return [
      {
        id: 1,
        name: "น้องมิ้ม",
        isGroup: false,
        avatar: users.find(u => u.id === 2)?.avatar,
        createdAt: new Date(),
        lastMessage: {
          id: 1,
          chatId: 1,
          senderId: 2,
          content: "ไปกินข้าวกันมั้ย? 🍜",
          messageType: "text",
          isRead: false,
          createdAt: new Date(Date.now() - 30 * 60 * 1000),
          sender: users.find(u => u.id === 2)!,
        },
        unreadCount: 2,
        members: [users.find(u => u.id === 2)!],
      },
      {
        id: 2,
        name: "พี่เป้",
        isGroup: false,
        avatar: users.find(u => u.id === 3)?.avatar,
        createdAt: new Date(),
        lastMessage: {
          id: 2,
          chatId: 2,
          senderId: 3,
          content: "งานเสร็จแล้วครับ ✅",
          messageType: "text",
          isRead: true,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          sender: users.find(u => u.id === 3)!,
        },
        unreadCount: 0,
        members: [users.find(u => u.id === 3)!],
      },
      {
        id: 3,
        name: "กลุ่ม Team Dev",
        isGroup: true,
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        createdAt: new Date(),
        lastMessage: {
          id: 3,
          chatId: 3,
          senderId: 2,
          content: "Meeting พรุ่งนี้ 10 โมงนะ",
          messageType: "text",
          isRead: false,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          sender: users.find(u => u.id === 2)!,
        },
        unreadCount: 5,
        members: users.slice(0, 3),
      }
    ];
  }
  
  getMockFriends(): User[] {
    return [
      {
        id: 5,
        username: "nong_ice",
        password: "mock-password",
        displayName: "น้องไอซ์",
        bio: "นักเรียน",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        isOnline: true,
        lastSeen: new Date(),
        createdAt: new Date(),
      },
      {
        id: 6,
        username: "phi_toh",
        password: "mock-password",
        displayName: "พี่โต้",
        bio: "นักกีฬา",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        isOnline: false,
        lastSeen: new Date(Date.now() - 60 * 60 * 1000),
        createdAt: new Date(),
      },
      {
        id: 7,
        username: "gif",
        password: "mock-password",
        displayName: "กิ๊ฟ",
        bio: "ช่างภาพ 📸",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        isOnline: true,
        lastSeen: new Date(),
        createdAt: new Date(),
      }
    ];
  }
}
