import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageHistoryService } from './message-history.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow connections from any origin
  },
})
export class MessageHistoryGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly messageHistoryService: MessageHistoryService) {}

  // Called after the module initialization
  onModuleInit() {
    // Listen to the historyUpdated event from the MessageHistoryService
    this.messageHistoryService.on('historyUpdated', (history) => {
      // Filter out the system prompt before emitting to clients
      const filteredHistory = history.filter(msg => msg.role !== 'system');
      // Emit the updated history to all connected clients
      this.server.emit('receiveChatHistory', filteredHistory);
    });
  }

  // Handle new WebSocket connections
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Emit the current message history to the newly connected client, excluding the system prompt
    const history = this.messageHistoryService.getHistory().filter(msg => msg.role !== 'system');
    client.emit('receiveChatHistory', history);
  }

  // Handle disconnections
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Listen for client requests for the latest message history
  @SubscribeMessage('requestChatHistory')
  handleMessageHistoryRequest(@ConnectedSocket() client: Socket, @MessageBody() data: any): void {
    // Emit the latest message history to the requesting client, excluding the system prompt
    const history = this.messageHistoryService.getHistory().filter(msg => msg.role !== 'system');
    client.emit('receiveChatHistory', history);
  }
}
