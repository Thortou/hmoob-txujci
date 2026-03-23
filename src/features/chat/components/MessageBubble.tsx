import { Message, MessageStatus } from "@/src/types/chat";

interface MessageBubbleProps {
  message: Message;
  isSent: boolean;
  showAvatar?: boolean;
  avatarUrl?: string;
  customerName?: string;
}

export default function MessageBubble({ message, isSent, showAvatar, avatarUrl, customerName }: MessageBubbleProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusIcon = () => {
    if (!isSent) return null;

    const status: MessageStatus = message.status || 'sent';

    switch (status) {
      case 'sent':
        return <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>;
      case 'delivered':
        return <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>;
      case 'read':
        return (
          <div className="flex">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
            <svg className="w-4 h-4 text-blue-500 -ml-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
          </div>
        );
      default:
        return null;
    }
  };

  const hasAttachment = message.attachments?.data && message.attachments.data.length > 0;

  return (
    <div className={`flex mb-4 ${isSent ? 'justify-end' : 'justify-start'}`}>
      {!isSent && showAvatar && avatarUrl && (
        <img
          src={avatarUrl}
          alt={customerName || 'Avatar'}
          className="w-8 h-8 rounded-full mr-2 mt-1 object-cover flex-shrink-0"
        />
      )}
      <div className={`max-w-[70%] ${isSent ? 'order-2' : ''}`}>
        <div
          className={`px-4 py-2 shadow-sm ${
            isSent
              ? 'bg-green-500 text-white rounded-l-2xl rounded-tr-2xl rounded-br-none'
              : 'bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl rounded-bl-none'
          }`}
        >
          {hasAttachment && (
            <div className="mb-2">
              {message.attachments?.data.map((attachment) => (
                <div key={attachment.id}>
                  {attachment.mime_type.startsWith('image/') && attachment.image_data && (
                    <img
                      src={attachment.image_data.url}
                      alt={attachment.name}
                      className="rounded-lg max-w-full h-auto"
                      style={{ maxHeight: '300px' }}
                    />
                  )}
                  {attachment.mime_type.startsWith('audio/') && attachment.audio_data && (
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${
                      isSent ? 'bg-green-600' : 'bg-gray-100'
                    }`}>
                      <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </button>
                      <audio
                        src={attachment.audio_data.url}
                        className="flex-1 h-8"
                        controls
                      />
                      {attachment.audio_data.duration && (
                        <span className="text-xs text-gray-400">
                          {Math.floor(attachment.audio_data.duration / 60)}:
                          {(attachment.audio_data.duration % 60).toFixed(0).padStart(2, '0')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <p className="text-sm leading-relaxed break-words">{message.message}</p>
        </div>
        <div className={`flex items-center mt-1 gap-1 ${isSent ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">{formatTime(message.created_time)}</span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
}
