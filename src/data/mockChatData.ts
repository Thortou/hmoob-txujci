import { Conversation, Message } from "../types/chat";
import { Tag } from "../types/chat";

// Page/Customer user IDs for distinguishing messages
const PAGE_ID = '5219309368198311';
const CUSTOMER_ID = '107425081532283';

// Mock conversations matching Facebook Messenger API format
export const mockConversations: Conversation[] = [
  {
    id: 't_1529129060861221',
    updated_time: '2026-03-10T13:51:37+0000',
    snippet: 'คุณส่งรูปภาพ',
    unread_count: 2,
    tags: ['VIP'],
    participants: {
      data: [
        {
          name: 'Vongsavanh Kpt',
          email: '5219309368198311@facebook.com',
          id: PAGE_ID,
        },
        {
          name: 'Kajudam',
          email: '107425081532283@facebook.com',
          id: CUSTOMER_ID,
        },
      ],
    },
    messages: {
      data: [
        {
          id: 'm_Jsa_MW8Frrvqa7VDneTTM3P8KQEwATYpqT69OBUephDlRidW_ftmNL9jWZH1dAoQvsMBVC3GS1Q8Jft1WCHd0A',
          message: '',
          from: {
            name: 'Kajudam',
            email: '107425081532283@facebook.com',
            id: CUSTOMER_ID,
          },
          created_time: '2026-03-10T13:51:37+0000',
          attachments: {
            data: [
              {
                id: '2177794556382110',
                mime_type: 'image/jpeg',
                name: 'image-2177794556382110',
                size: 64874,
                image_data: {
                  width: 560,
                  height: 640,
                  max_width: 560,
                  max_height: 640,
                  url: 'https://scontent.fvte5-1.fna.fbcdn.net/v/t1.15752-9/646189232_2177794559715443_7938280104104456507_n.png',
                  preview_url: 'https://scontent.fvte5-1.fna.fbcdn.net/v/t1.15752-9/646189232_2177794559715443_7938280104104456507_n.png',
                  image_type: 1,
                  render_as_sticker: false,
                },
              },
            ],
          },
          is_echo: false,
        },
        {
          id: 'm_9pUJU_y1ysFkX787BvpL1XP8KQEwATYpqT69OBUephD4QFBy7b68xjBCKS9MVab9BVROFRnrUaxzAkiE9rljtw',
          message: '🔲 แชร์ QR',
          from: {
            name: 'Vongsavanh Kpt',
            email: '5219309368198311@facebook.com',
            id: PAGE_ID,
          },
          created_time: '2026-03-10T13:51:30+0000',
          is_echo: true,
        },
      ],
    },
  },
  {
    id: 't_1529129060861222',
    updated_time: '2026-03-03T08:47:48+0000',
    snippet: 'Good evening',
    unread_count: 0,
    tags: ['ສົນໃຈ'],
    participants: {
      data: [
        {
          name: 'Thortou Her Pahuao',
          email: '33934096576235867@facebook.com',
          id: '33934096576235867',
        },
        {
          name: 'Kajudam',
          email: '107425081532283@facebook.com',
          id: CUSTOMER_ID,
        },
      ],
    },
    messages: {
      data: [
        {
          id: 'm_n4TTfo1-yWhiZ0xmG-Ual_lRQweGkN8vSF3zOytrmREl8LrqDideEraLAb59MTg9i9GFE_x6Wjl6YdYXfx3qdg',
          message: 'Good evening',
          from: {
            name: 'Thortou Her Pahuao',
            email: '33934096576235867@facebook.com',
            id: '33934096576235867',
          },
          to: {
            data: [
              {
                name: 'Kajudam',
                email: '107425081532283@facebook.com',
                id: CUSTOMER_ID,
              },
            ],
          },
          created_time: '2026-03-03T08:47:48+0000',
        },
        {
          id: 'm_x6e5Z3eK-3UWi_2iRUfBlPlRQweGkN8vSF3zOytrmRGSQ_Zpxx8sxRvSsJYXYTG1SCI_cP9G67Kwdg1_9xt3TA',
          message: 'ສະບາຍດີ',
          from: {
            name: 'Thortou Her Pahuao',
            email: '33934096576235867@facebook.com',
            id: '33934096576235867',
          },
          to: {
            data: [
              {
                name: 'Kajudam',
                email: '107425081532283@facebook.com',
                id: CUSTOMER_ID,
              },
            ],
          },
          created_time: '2026-03-03T08:46:44+0000',
        },
        {
          id: 'm_gWGJMrI7KUrfzIHkhwx5jflRQweGkN8vSF3zOytrmRHaa4kmWHopazQXHY4irr5_f9PjGXxZqMhkCvGc2XRj5Q',
          message: 'hi',
          from: {
            name: 'Thortou Her Pahuao',
            email: '33934096576235867@facebook.com',
            id: '33934096576235867',
          },
          to: {
            data: [
              {
                name: 'Kajudam',
                email: '107425081532283@facebook.com',
                id: CUSTOMER_ID,
              },
            ],
          },
          created_time: '2026-03-03T08:39:49+0000',
        },
      ],
    },
  },
  {
    id: 't_1529129060861223',
    updated_time: '2026-03-09T14:30:00+0000',
    snippet: 'Hey! Are you available for a call today?',
    unread_count: 0,
    tags: ['ສົນໃຈ', 'VIP'],
    participants: {
      data: [
        {
          name: 'Mike Chen',
          email: '123456789@facebook.com',
          id: '123456789',
        },
        {
          name: 'Kajudam',
          email: '107425081532283@facebook.com',
          id: CUSTOMER_ID,
        },
      ],
    },
    messages: {
      data: [
        {
          id: 'm_msg3-3',
          message: 'Hey! Are you available for a call today?',
          from: {
            name: 'Mike Chen',
            email: '123456789@facebook.com',
            id: '123456789',
          },
          created_time: '2026-03-09T14:30:00+0000',
        },
        {
          id: 'm_msg3-2',
          message: 'Hey! Great, thanks! Just finished the design mockups.',
          from: {
            name: 'Mike Chen',
            email: '123456789@facebook.com',
            id: '123456789',
          },
          created_time: '2026-03-09T12:30:00+0000',
        },
        {
          id: 'm_msg3-1',
          message: 'Hi Mike! How are you doing?',
          from: {
            name: 'Kajudam',
            email: '107425081532283@facebook.com',
            id: CUSTOMER_ID,
          },
          to: {
            data: [
              {
                name: 'Mike Chen',
                email: '123456789@facebook.com',
                id: '123456789',
              },
            ],
          },
          created_time: '2026-03-09T12:00:00+0000',
          is_echo: true,
        },
      ],
    },
  },
  {
    id: 't_1529129060861224',
    updated_time: '2026-03-08T10:00:00+0000',
    snippet: 'Can you send me the meeting notes?',
    unread_count: 1,
    participants: {
      data: [
        {
          name: 'Alex Thompson',
          email: '987654321@facebook.com',
          id: '987654321',
        },
        {
          name: 'Kajudam',
          email: '107425081532283@facebook.com',
          id: CUSTOMER_ID,
        },
      ],
    },
    messages: {
      data: [
        {
          id: 'm_msg4-2',
          message: 'Can you send me the meeting notes?',
          from: {
            name: 'Alex Thompson',
            email: '987654321@facebook.com',
            id: '987654321',
          },
          created_time: '2026-03-08T10:00:00+0000',
        },
        {
          id: 'm_msg4-1',
          message: 'Hi Alex, hope you had a good weekend!',
          from: {
            name: 'Kajudam',
            email: '107425081532283@facebook.com',
            id: CUSTOMER_ID,
          },
          to: {
            data: [
              {
                name: 'Alex Thompson',
                email: '987654321@facebook.com',
                id: '987654321',
              },
            ],
          },
          created_time: '2026-03-08T09:00:00+0000',
          is_echo: true,
        },
      ],
    },
  },
];

// Helper function to get messages for a conversation
export const getMessagesForConversation = (conversationId: string): Message[] => {
  const conversation = mockConversations.find(c => c.id === conversationId);
  return conversation?.messages.data || [];
};

// Helper function to add a new message to a conversation
export const addMessageToConversation = (conversationId: string, message: Message): void => {
  const conversation = mockConversations.find(c => c.id === conversationId);
  if (conversation) {
    conversation.messages.data.push(message);
  }
};

// Current user (page) information
export const currentUser = {
  id: PAGE_ID,
  name: 'Kajudam',
  avatar: 'https://i.pravatar.cc/150?img=12',
};

// Helper function to get the customer participant from a conversation
export const getCustomerFromConversation = (conversation: Conversation) => {
  // Return the participant that is not the current user (page)
  return conversation.participants.data.find(p => p.id !== currentUser.id);
};

// Helper function to check if a message is from the page
export const isMessageFromPage = (message: Message) => {
  return message.is_echo === true || message.from.id === currentUser.id;
};
